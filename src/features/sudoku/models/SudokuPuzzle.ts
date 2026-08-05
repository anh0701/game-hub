import type { Cell } from "./Cell";

export interface SudokuPuzzle {
    puzzle: Cell[][];
    solution: number[][];
}