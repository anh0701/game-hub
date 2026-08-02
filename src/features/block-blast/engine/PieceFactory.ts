import type { Piece } from "../models/Piece";

const PIECES: Piece[] = [

    {
        id: "1",
        color: "#3b82f6",

        shape: [
            [1]
        ]
    },

    {
        id: "2",

        color: "#22c55e",

        shape: [
            [1, 1]
        ]
    },

    {
        id: "3",

        color: "#f59e0b",

        shape: [
            [1],
            [1]
        ]
    }

];

export class PieceFactory {

    static random(): Piece {

        const piece = PIECES[
            Math.floor(Math.random() * PIECES.length)
        ];

        return structuredClone(piece);

    }
    static generatePieces(): Piece[] {

        return [

            this.random(),

            this.random(),

            this.random()

        ];

    }

}