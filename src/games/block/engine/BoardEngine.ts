import type { Board } from "../models/Board";
import type { InitialBlock } from "../models/Level";
import type { Piece } from "../models/Piece";

export class BoardEngine {
    public readonly board: Board;
    private initialBlocks: InitialBlock[];

    constructor(rows = 8, cols = 8, initialBlocks: InitialBlock[] = []) {
        this.initialBlocks = initialBlocks;

        this.board = {
            rows,
            cols,
            cells: Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => ({
                    occupied: false,
                }))
            ),
        };

        this.initializeBlocks(initialBlocks);
    }

    initializeBlocks(blocks: InitialBlock[]) {
        for (const block of blocks) {
            if (block.row < 0 || block.row >= this.board.rows || block.col < 0 || block.col >= this.board.cols) {
                continue;
            }

            this.setCell(block.row, block.col, block.color);
        }
    }
    setInitialBlocks(blocks: InitialBlock[]) {
        this.initialBlocks = blocks;

        this.reset();
    }

    getCell(row: number, col: number) {
        return this.board.cells[row][col];
    }

    isOccupied(row: number, col: number): boolean {
        return this.getCell(row, col).occupied;
    }

    setCell(row: number, col: number, color: string) {
        this.board.cells[row][col] = {
            occupied: true,
            color,
        };
    }

    clearCell(row: number, col: number) {
        this.board.cells[row][col] = {
            occupied: false,
        };
    }

    reset() {
        this.board.cells = Array.from({ length: this.board.rows }, () =>
            Array.from({ length: this.board.cols }, () => ({
                occupied: false,
            }))
        );

        this.initializeBlocks(this.initialBlocks);
    }

    canPlace(piece: Piece, startRow: number, startCol: number): boolean {
        if (startRow < 0 || startCol < 0) {
            return false;
        }

        const pieceHeight = piece.shape.length;
        const pieceWidth = piece.shape[0].length;

        // Boundary check
        if (startRow + pieceHeight > this.board.rows) {
            return false;
        }

        if (startCol + pieceWidth > this.board.cols) {
            return false;
        }

        // Collision check
        for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
                if (piece.shape[r][c] !== 1) {
                    continue;
                }

                const boardRow = startRow + r;
                const boardCol = startCol + c;

                if (boardRow < 0 || boardRow >= this.board.rows || boardCol < 0 || boardCol >= this.board.cols) {
                    return false;
                }

                if (this.board.cells[boardRow][boardCol].occupied) {
                    return false;
                }
            }
        }

        return true;
    }

    placePiece(piece: Piece, startRow: number, startCol: number): boolean {
        if (!this.canPlace(piece, startRow, startCol)) {
            return false;
        }

        const pieceHeight = piece.shape.length;
        const pieceWidth = piece.shape[0].length;

        for (let row = 0; row < pieceHeight; row++) {
            for (let col = 0; col < pieceWidth; col++) {
                if (piece.shape[row][col] === 0) {
                    continue;
                }

                this.setCell(startRow + row, startCol + col, piece.color);
            }
        }

        return true;
    }

    getCompletedRows(): number[] {
        const rows: number[] = [];

        for (let row = 0; row < this.board.rows; row++) {
            const completed = this.board.cells[row].every((cell) => cell.occupied);

            if (completed) {
                rows.push(row);
            }
        }

        return rows;
    }

    getCompletedColumns(): number[] {
        const cols: number[] = [];

        for (let col = 0; col < this.board.cols; col++) {
            let completed = true;

            for (let row = 0; row < this.board.rows; row++) {
                if (!this.isOccupied(row, col)) {
                    completed = false;
                    break;
                }
            }

            if (completed) {
                cols.push(col);
            }
        }

        return cols;
    }

    clearCompletedLines() {
        const rows = this.getCompletedRows();
        const cols = this.getCompletedColumns();

        const cellsToClear = new Set<string>();

        for (const row of rows) {
            for (let col = 0; col < this.board.cols; col++) {
                cellsToClear.add(`${row}:${col}`);
            }
        }

        for (const col of cols) {
            for (let row = 0; row < this.board.rows; row++) {
                cellsToClear.add(`${row}:${col}`);
            }
        }

        let clearedBlocks = 0;
        const clearedBlocksByColor: Record<string, number> = {};

        // Đếm block TRƯỚC khi xóa
        for (const key of cellsToClear) {
            const [row, col] = key.split(":").map(Number);

            const cell = this.board.cells[row][col];

            if (!cell.occupied || !cell.color) {
                continue;
            }

            clearedBlocks++;

            clearedBlocksByColor[cell.color] = (clearedBlocksByColor[cell.color] ?? 0) + 1;
        }

        // Xóa
        for (const key of cellsToClear) {
            const [row, col] = key.split(":").map(Number);

            this.clearCell(row, col);
        }

        return {
            rows,
            cols,
            clearedBlocks,
            clearedBlocksByColor,
        };
    }

    public tryPlacePiece(piece: Piece, row: number, col: number): boolean {
        if (!this.canPlace(piece, row, col)) {
            return false;
        }

        this.placePiece(piece, row, col);

        return true;
    }

    clearPreview(): void {
        for (const row of this.board.cells) {
            for (const cell of row) {
                delete cell.preview;
                delete cell.previewValid;
            }
        }
    }

    previewPiece(piece: Piece, startRow: number, startCol: number) {
        this.clearPreview();

        const valid = this.canPlace(piece, startRow, startCol);

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col] === 0) {
                    continue;
                }

                const r = startRow + row;
                const c = startCol + col;

                if (r < 0 || c < 0 || r >= this.board.rows || c >= this.board.cols) {
                    continue;
                }
                this.board.cells[r][c].preview = true;
                this.board.cells[r][c].previewValid = valid;
            }
        }
    }

    public isGameOver(pieces: Array<Piece | null>): boolean {
        for (const piece of pieces) {
            if (!piece) {
                continue;
            }

            for (let row = 0; row < this.board.rows; row++) {
                for (let col = 0; col < this.board.cols; col++) {
                    if (this.canPlace(piece, row, col)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
