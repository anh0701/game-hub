import type { Cell } from "../models/Cell";

export function createEmptyBoard(): number[][] {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function cloneBoard(board: number[][]): number[][] {
    return board.map((row) => [...row]);
}

export function createCellBoard(board: number[][]): Cell[][] {
    return board.map((row) =>
        row.map((value) => ({
            value,
            fixed: value !== 0,
        }))
    );
}
