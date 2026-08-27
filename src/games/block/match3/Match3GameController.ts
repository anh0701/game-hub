import { BoardEngine } from "../engine/BoardEngine";

import type { Board } from "../models/Board";
import type { InitialBlock } from "../models/Level";

import { Match3Matcher } from "./Match3Matcher";

import type { Match3Animation, Match3MoveResult, Match3Position } from "./Match3Types";

export class Match3GameController {
    private readonly boardEngine: BoardEngine;

    private readonly colors = ["cyan", "blue", "green", "yellow", "orange", "red", "purple"];

    private initialBlocks: InitialBlock[] = [];

    private selectedPosition: Match3Position | null = null;

    private score = 0;

    private gameOver = false;

    private animating = false;

    private animation: Match3Animation = "idle";

    private clearingPositions: Match3Position[] = [];

    private fallingPositions: Match3Position[] = [];

    private spawningPositions: Match3Position[] = [];

    constructor(rows = 8, cols = 8) {
        this.initialBlocks = this.generateInitialBoard(rows, cols);

        this.boardEngine = new BoardEngine(rows, cols, this.initialBlocks);

        this.gameOver = !this.hasAvailableMove();
    }

    getBoard(): Board {
        return {
            ...this.boardEngine.board,

            cells: this.boardEngine.board.cells.map((row) => [...row]),
        };
    }

    getScore(): number {
        return this.score;
    }

    isGameOver(): boolean {
        return this.gameOver;
    }

    isAnimating(): boolean {
        return this.animating;
    }

    getAnimation(): Match3Animation {
        return this.animation;
    }

    getSelectedPosition(): Match3Position | null {
        return this.selectedPosition;
    }

    getClearingPositions(): Match3Position[] {
        return [...this.clearingPositions];
    }

    getFallingPositions(): Match3Position[] {
        return [...this.fallingPositions];
    }

    getSpawningPositions(): Match3Position[] {
        return [...this.spawningPositions];
    }

    select(row: number, col: number): Match3MoveResult | null {
        if (this.gameOver || this.animating) {
            return null;
        }

        if (row < 0 || row >= this.boardEngine.board.rows || col < 0 || col >= this.boardEngine.board.cols) {
            return null;
        }

        const cell = this.boardEngine.getCell(row, col);

        if (!cell.occupied) {
            return null;
        }

        if (!this.selectedPosition) {
            this.selectedPosition = {
                row,
                col,
            };

            return null;
        }

        const first = this.selectedPosition;

        const second: Match3Position = {
            row,
            col,
        };

        // Click lại chính block
        if (first.row === second.row && first.col === second.col) {
            this.selectedPosition = null;

            return null;
        }

        // Không kề nhau
        if (!this.isAdjacent(first, second)) {
            this.selectedPosition = second;

            return null;
        }

        this.selectedPosition = null;

        return this.swapAndPrepare(first, second);
    }

    private swapAndPrepare(first: Match3Position, second: Match3Position): Match3MoveResult {
        this.swap(first, second);

        const matches = Match3Matcher.findMatches(this.boardEngine.board);

        // Không tạo match
        if (matches.length === 0) {
            this.swap(first, second);

            return {
                success: false,
                swapped: false,
                clearedBlocks: [],
                scoreGained: 0,
                score: this.score,
                gameOver: this.gameOver,
            };
        }

        this.animating = true;

        this.animation = "clearing";

        const cleared = this.uniquePositions(matches.flatMap((group) => group.cells));

        this.clearingPositions = cleared;

        return {
            success: true,

            swapped: true,

            clearedBlocks: cleared,

            scoreGained: 0,

            score: this.score,

            gameOver: false,
        };
    }

    resolveClearPhase(): void {
        if (!this.animating || this.animation !== "clearing") {
            return;
        }

        const positions = this.clearingPositions;

        for (const position of positions) {
            this.boardEngine.clearCell(position.row, position.col);
        }

        const clearedCount = positions.length;

        this.score += clearedCount;

        this.clearingPositions = [];

        // Xác định block nào sẽ rơi
        this.fallingPositions = this.getFallingPositions();

        this.animation = "falling";
    }

    resolveFallPhase(): void {
        if (!this.animating || this.animation !== "falling") {
            return;
        }

        this.collapseColumns();

        this.fallingPositions = [];

        // Tìm các ô cần spawn
        this.spawningPositions = this.getEmptyPositions();

        this.animation = "spawning";
    }

    resolveSpawnPhase(): void {
        if (!this.animating || this.animation !== "spawning") {
            return;
        }

        for (const position of this.spawningPositions) {
            this.boardEngine.setCell(position.row, position.col, this.randomColor());
        }

        this.spawningPositions = [];

        // Kiểm tra chain reaction
        const matches = Match3Matcher.findMatches(this.boardEngine.board);

        if (matches.length > 0) {
            this.clearingPositions = this.uniquePositions(matches.flatMap((group) => group.cells));

            this.animation = "clearing";

            return;
        }

        // Không còn chain
        this.animation = "idle";

        this.animating = false;

        this.gameOver = !this.hasAvailableMove();
    }

    restart(): void {
        this.initialBlocks = this.generateInitialBoard(this.boardEngine.board.rows, this.boardEngine.board.cols);

        this.boardEngine.setInitialBlocks(this.initialBlocks);

        this.selectedPosition = null;

        this.score = 0;

        this.gameOver = false;

        this.animating = false;

        this.animation = "idle";

        this.clearingPositions = [];

        this.fallingPositions = [];

        this.spawningPositions = [];
    }

    private swap(first: Match3Position, second: Match3Position): void {
        const firstCell = this.boardEngine.getCell(first.row, first.col);

        const secondCell = this.boardEngine.getCell(second.row, second.col);

        if (!firstCell.color || !secondCell.color) {
            return;
        }

        const firstColor = firstCell.color;

        const secondColor = secondCell.color;

        this.boardEngine.setCell(first.row, first.col, secondColor);

        this.boardEngine.setCell(second.row, second.col, firstColor);
    }

    // =========================================================
    // GRAVITY
    // =========================================================

    private collapseColumns(): void {
        const board = this.boardEngine.board;

        for (let col = 0; col < board.cols; col++) {
            let writeRow = board.rows - 1;

            for (let row = board.rows - 1; row >= 0; row--) {
                const cell = board.cells[row][col];

                if (!cell.occupied || !cell.color) {
                    continue;
                }

                const color = cell.color;

                if (writeRow !== row) {
                    this.boardEngine.setCell(writeRow, col, color);

                    this.boardEngine.clearCell(row, col);
                }

                writeRow--;
            }

            for (let row = writeRow; row >= 0; row--) {
                this.boardEngine.clearCell(row, col);
            }
        }
    }

    private getEmptyPositions(): Match3Position[] {
        const board = this.boardEngine.board;

        const positions: Match3Position[] = [];

        for (let row = 0; row < board.rows; row++) {
            for (let col = 0; col < board.cols; col++) {
                if (!board.cells[row][col].occupied) {
                    positions.push({
                        row,
                        col,
                    });
                }
            }
        }

        return positions;
    }

    private hasAvailableMove(): boolean {
        const board = this.boardEngine.board;

        for (let row = 0; row < board.rows; row++) {
            for (let col = 0; col < board.cols; col++) {
                if (!board.cells[row][col].occupied) {
                    continue;
                }

                if (col + 1 < board.cols) {
                    if (
                        this.wouldCreateMatch(
                            {
                                row,
                                col,
                            },
                            {
                                row,
                                col: col + 1,
                            }
                        )
                    ) {
                        return true;
                    }
                }

                if (row + 1 < board.rows) {
                    if (
                        this.wouldCreateMatch(
                            {
                                row,
                                col,
                            },
                            {
                                row: row + 1,
                                col,
                            }
                        )
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private wouldCreateMatch(first: Match3Position, second: Match3Position): boolean {
        this.swap(first, second);

        const matches = Match3Matcher.findMatches(this.boardEngine.board);

        this.swap(first, second);

        return matches.length > 0;
    }

    private isAdjacent(first: Match3Position, second: Match3Position): boolean {
        return Math.abs(first.row - second.row) + Math.abs(first.col - second.col) === 1;
    }

    private uniquePositions(positions: Match3Position[]): Match3Position[] {
        const map = new Map<string, Match3Position>();

        for (const position of positions) {
            const key = `${position.row}:${position.col}`;

            if (!map.has(key)) {
                map.set(key, position);
            }
        }

        return Array.from(map.values());
    }

    private randomColor(): string {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    private generateInitialBoard(rows: number, cols: number): InitialBlock[] {
        for (let attempt = 0; attempt < 100; attempt++) {
            const blocks: InitialBlock[] = [];

            const boardColors = Array.from({ length: rows }, () => Array<string>(cols).fill(""));

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const available = this.colors.filter(
                        (color) => !this.wouldCreateInitialMatch(boardColors, row, col, color)
                    );

                    const candidates = available.length > 0 ? available : this.colors;

                    const color = candidates[Math.floor(Math.random() * candidates.length)];

                    boardColors[row][col] = color;

                    blocks.push({
                        row,
                        col,
                        color,
                    });
                }
            }

            const testEngine = new BoardEngine(rows, cols, blocks);

            const matches = Match3Matcher.findMatches(testEngine.board);

            if (matches.length > 0) {
                continue;
            }

            if (this.boardHasAvailableMove(testEngine)) {
                return blocks;
            }
        }

        return this.createFallbackBoard(rows, cols);
    }

    private wouldCreateInitialMatch(board: string[][], row: number, col: number, color: string): boolean {
        if (col >= 2 && board[row][col - 1] === color && board[row][col - 2] === color) {
            return true;
        }

        if (row >= 2 && board[row - 1][col] === color && board[row - 2][col] === color) {
            return true;
        }

        return false;
    }

    private boardHasAvailableMove(engine: BoardEngine): boolean {
        const board = engine.board;

        for (let row = 0; row < board.rows; row++) {
            for (let col = 0; col < board.cols; col++) {
                if (!board.cells[row][col].occupied) {
                    continue;
                }

                if (col + 1 < board.cols && board.cells[row][col + 1].occupied) {
                    if (
                        this.wouldCreateMatchOnEngine(
                            engine,
                            {
                                row,
                                col,
                            },
                            {
                                row,
                                col: col + 1,
                            }
                        )
                    ) {
                        return true;
                    }
                }

                if (row + 1 < board.rows && board.cells[row + 1][col].occupied) {
                    if (
                        this.wouldCreateMatchOnEngine(
                            engine,
                            {
                                row,
                                col,
                            },
                            {
                                row: row + 1,
                                col,
                            }
                        )
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private wouldCreateMatchOnEngine(engine: BoardEngine, first: Match3Position, second: Match3Position): boolean {
        const firstCell = engine.getCell(first.row, first.col);

        const secondCell = engine.getCell(second.row, second.col);

        if (!firstCell.color || !secondCell.color) {
            return false;
        }

        const firstColor = firstCell.color;

        const secondColor = secondCell.color;

        engine.setCell(first.row, first.col, secondColor);

        engine.setCell(second.row, second.col, firstColor);

        const matches = Match3Matcher.findMatches(engine.board);

        engine.setCell(first.row, first.col, firstColor);

        engine.setCell(second.row, second.col, secondColor);

        return matches.length > 0;
    }

    private createFallbackBoard(rows: number, cols: number): InitialBlock[] {
        const pattern = ["red", "blue", "green", "yellow", "purple"];

        const blocks: InitialBlock[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                blocks.push({
                    row,
                    col,
                    color: pattern[(row * 2 + col) % pattern.length],
                });
            }
        }

        return blocks;
    }
}
