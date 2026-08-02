import type { Cell } from "./Cell";

export interface Board {

    rows: number;

    cols: number;

    cells: Cell[][];

}