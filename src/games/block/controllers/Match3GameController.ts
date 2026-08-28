import { BoardEngine } from "../engine/BoardEngine";
import { Match3Matcher } from "../engine/Match3Matcher";

import type { Board } from "../models/Board";
import type { InitialBlock } from "../models/Level";
import type { Match3Level } from "../models/Match3Level";
import type { Match3Animation, Match3MoveResult, Match3Position } from "../models/Match3Types";

export class Match3GameController {
    private readonly boardEngine: BoardEngine;

    private readonly colors = ["cyan", "blue", "green", "yellow", "orange", "red", "purple"];

    private initialBlocks: InitialBlock[] = [];

    private selectedPosition: Match3Position | null = null;

    private score = 0;

    private gameOver = false;

    private animating = false;

    private level?: Match3Level;

    private levelPassed = false;

    private levelFailed = false;

    private timeRemaining = 0;

    private clearedBlocks = 0;

    private clearedBlocksByColor: Record<string, number> = {};

    private animation: Match3Animation = "idle";

    private clearingPositions: Match3Position[] = [];

    private fallingPositions: Match3Position[] = [];

    private spawningPositions: Match3Position[] = [];

    constructor(rows = 8, cols = 8, level?: Match3Level) {
        this.level = level;

        this.timeRemaining = level?.timeLimit ?? 0;

        this.initialBlocks = this.generateInitialBoard(rows, cols);

        this.boardEngine = new BoardEngine(rows, cols, this.initialBlocks);

        this.gameOver = !this.hasAvailableMove();
    }

    getLevel(): Match3Level | undefined {
        return this.level;
    }

    isLevelMode(): boolean {
        return this.level !== undefined;
    }

    isLevelPassed(): boolean {
        return this.levelPassed;
    }

    isLevelFailed(): boolean {
        return this.levelFailed;
    }

    getTimeRemaining(): number {
        return this.timeRemaining;
    }

    getClearedBlocks(): number {
        return this.clearedBlocks;
    }

    getClearedBlocksByColor(): Record<string, number> {
        return {
            ...this.clearedBlocksByColor,
        };
    }

    getObjectiveProgress() {
        if (!this.level) {
            return [];
        }

        return this.level.objectives.map((objective) => {
            let current = 0;

            if (objective.type === "clear_blocks") {
                if (objective.color) {
                    current = this.clearedBlocksByColor[objective.color] ?? 0;
                } else {
                    current = this.clearedBlocks;
                }
            }

            return {
                ...objective,

                current,

                completed: current >= objective.target,
            };
        });
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

        // Phải lưu màu TRƯỚC khi clear cell.

        for (const position of positions) {
            const cell = this.boardEngine.getCell(position.row, position.col);

            if (cell.color) {
                this.clearedBlocksByColor[cell.color] = (this.clearedBlocksByColor[cell.color] ?? 0) + 1;
            }
        }

        // Sau khi đã lưu màu mới xóa.

        for (const position of positions) {
            this.boardEngine.clearCell(position.row, position.col);
        }

        const clearedCount = positions.length;

        this.score += clearedCount;

        this.clearedBlocks += clearedCount;

        this.clearingPositions = [];

        /*
         * Xác định block sẽ rơi.
         */
        this.fallingPositions = this.getFallingPositions();

        this.animation = "falling";
    }

    private checkLevelComplete(): boolean {
        if (!this.level) {
            return false;
        }

        return this.level.objectives.every((objective) => {
            if (objective.type === "clear_blocks") {
                if (objective.color) {
                    return (this.clearedBlocksByColor[objective.color] ?? 0) >= objective.target;
                }

                return this.clearedBlocks >= objective.target;
            }

            return false;
        });
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

        if (this.checkLevelComplete()) {
            this.levelPassed = true;

            this.animation = "idle";

            this.animating = false;

            return;
        }

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

    tick(): void {
        if (!this.level || this.levelPassed || this.levelFailed || this.gameOver) {
            return;
        }

        if (this.timeRemaining <= 0) {
            this.timeRemaining = 0;

            this.levelFailed = true;

            this.gameOver = true;

            return;
        }

        this.timeRemaining--;

        if (this.timeRemaining <= 0) {
            this.timeRemaining = 0;

            if (!this.checkLevelComplete()) {
                this.levelFailed = true;

                this.gameOver = true;
            }
        }
    }

    restart(): void {
        this.boardEngine.setInitialBlocks(
            this.generateInitialBoard(this.boardEngine.board.rows, this.boardEngine.board.cols)
        );

        this.selectedPosition = null;

        this.score = 0;

        this.gameOver = false;

        this.animating = false;

        this.animation = "idle";

        this.levelPassed = false;

        this.levelFailed = false;

        this.timeRemaining = this.level?.timeLimit ?? 0;

        this.clearedBlocks = 0;

        this.clearedBlocksByColor = {};

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
        const targetColors = this.getTargetColors();

        // Classic mode hoặc level không có target color
        if (targetColors.length === 0) {
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        }

        /*
         * Level mode:
         *
         * Target color: weight 3
         * Normal color: weight 1
         *
         * Ví dụ có 1 target:
         *
         * red    = 3
         * blue   = 1
         * green  = 1
         * yellow = 1
         * orange = 1
         * purple = 1
         * cyan   = 1
         *
         * => red ~30%
         */
        const weightedColors = this.colors.flatMap((color) => {
            const weight = targetColors.includes(color) ? 3 : 1;

            return Array(weight).fill(color);
        });

        return weightedColors[Math.floor(Math.random() * weightedColors.length)];
    }

    private getTargetColors(): string[] {
        if (!this.level) {
            return [];
        }

        return this.level.objectives
            .filter((objective) => objective.type === "clear_blocks" && objective.color)
            .map((objective) => objective.color!)
            .filter((color, index, array) => array.indexOf(color) === index);
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
