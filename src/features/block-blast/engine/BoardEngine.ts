import type { Board } from "../models/Board";
import type { Piece } from "../models/Piece";

export class BoardEngine {

    board: Board;

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
    
    isOccupied(row: number, col: number) {

        return this.board.cells[row][col].occupied;

    }

    setCell(
        row: number,
        col: number,
        color: string
    ) {

        this.board.cells[row][col] = {

            occupied: true,

            color

        };

    }

    clearCell(row: number, col: number) {

        this.board.cells[row][col] = {

            occupied: false

        };

    }

    canPlace(
        piece: Piece,
        row: number,
        col: number
    ) {

        if (row + piece.height > this.board.rows) {
            return false;
        }

        if (col + piece.width > this.board.cols) {
            return false;
        }

        for (let r = 0; r < piece.height; r++) {

            for (let c = 0; c < piece.width; c++) {

                if (piece.shape[r][c] === 0) {
                    continue;
                }

                if (
                    this.isOccupied(
                        row + r,
                        col + c
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
        row: number,
        col: number
    ) {

        if (!this.canPlace(piece, row, col)) {
            return false;
        }

        for (let r = 0; r < piece.height; r++) {

            for (let c = 0; c < piece.width; c++) {

                if (piece.shape[r][c] === 0) {
                    continue;
                }

                this.setCell(
                    row + r,
                    col + c,
                    piece.color
                );

            }

        }

        return true;

    }

}