import type { Board } from "../models/Board";
import type { Piece } from "../models/Piece";

export class BoardEngine {
    public readonly board: Board;

    constructor(rows = 8, cols = 8) {
        this.board = {
            rows,
            cols,
            cells: Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => ({
                    occupied: false,
                }))
            ),
        };
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
        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                this.clearCell(row, col);
            }
        }
    }

    canPlace(
        piece: Piece,
        startRow: number,
        startCol: number
    ): boolean {
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
        for (let row = 0; row < pieceHeight; row++) {
            for (let col = 0; col < pieceWidth; col++) {

                if (piece.shape[row][col] === 0) {
                    continue;
                }

                if (
                    this.isOccupied(
                        startRow + row,
                        startCol + col
                    )
                ) {
                    return false;
                }
            }
        }

        return true;
    }

    placePiece(
        piece: Piece,
        startRow: number,
        startCol: number
    ): boolean {

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

                this.setCell(
                    startRow + row,
                    startCol + col,
                    piece.color
                );
            }
        }

        return true;
    }

    getCompletedRows(): number[] {
        const rows: number[] = [];

        for (let row = 0; row < this.board.rows; row++) {

            const completed =
                this.board.cells[row].every(
                    cell => cell.occupied
                );

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

        rows.forEach((row) => {
            for (let col = 0; col < this.board.cols; col++) {
                this.clearCell(row, col);
            }
        });

        cols.forEach((col) => {
            for (let row = 0; row < this.board.rows; row++) {
                this.clearCell(row, col);
            }
        });

        return {
            rows,
            cols,
        };
    }

    public tryPlacePiece(
        piece: Piece,
        row: number,
        col: number
    ): boolean {

        if (!this.canPlace(piece, row, col)) {
            return false;
        }

        this.placePiece(piece, row, col);

        return true;
    }
}