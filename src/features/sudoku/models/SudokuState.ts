import type { Cell } from "./Cell";

export interface SudokuState {
    board: Cell[][];
    score: number;
    gameOver: boolean;
}