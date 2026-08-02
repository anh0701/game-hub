import type { Piece } from "../models/Piece";
import { Random } from "./Random";
import { SHAPES } from "./ShapeRepository";

const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#a855f7",
    "#f59e0b",
    "#ef4444",
];

export class PieceFactory {

    static createRandomPiece(): Piece {

        const definition =
            SHAPES[
            Random.int(
                SHAPES.length
            )
            ];

        return {

            id: crypto.randomUUID(),

            name: definition.name,

            shape: definition.shape.map(
                row => [...row]
            ),

            color:
                COLORS[
                Random.int(
                    COLORS.length
                )
                ]

        };

    }

    static generatePieces(): Piece[] {

        return [

            this.createRandomPiece(),

            this.createRandomPiece(),

            this.createRandomPiece(),

        ];

    }

}