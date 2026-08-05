import type { Position } from "../models/Position";
import { BOARD_SIZE } from "./constants";
import { shuffle } from "./Random";
import { isValidMove } from "./Validator";

export function solveSudoku(board: number[][]): boolean {
    const position = findEmptyCell(board);

    if (position === null) {
        return true;
    }

    // sinh board sudoku

    const { row, col } = position;

    const numbers = Array.from({ length: BOARD_SIZE }, (_, index) => index + 1);

    shuffle(numbers);

    for (const value of numbers) {
        if (!isValidMove(board, row, col, value)) {
            continue;
        }

        board[row][col] = value;

        if (solveSudoku(board)) {
            return true;
        }

        board[row][col] = 0;
    }

    return false;
}

function findEmptyCell(board: number[][]): Position | null {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 0) {
                return {
                    row,
                    col,
                };
            }
        }
    }

    return null;
}
