import type { SudokuPuzzle } from "../models/SudokuPuzzle";
import { cloneBoard, createCellBoard, createEmptyBoard } from "./Board";
import { REMOVE_COUNT } from "./constants";
import { solveSudoku } from "./Solver";

export function generateSudoku(): SudokuPuzzle {
    const solution = createEmptyBoard();

    solveSudoku(solution);

    const puzzle = cloneBoard(solution);

    removeRandomCells(puzzle, REMOVE_COUNT);

    return {
        puzzle: createCellBoard(puzzle),
        solution,
    };
}

function removeRandomCells(
    board: number[][],
    count: number
): void {
    let removed = 0;

    while (removed < count) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] === 0) {
            continue;
        }

        board[row][col] = 0;
        removed++;
    }
}