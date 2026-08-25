export interface Piece {
    id: string;

    color: string;

    shape: number[][];

    anchor: {
        row: number;

        col: number;
    };
}
