import type { Piece } from "../models/Piece";

import { ShapeRepository } from "./ShapeRepository";

export class PieceFactory {

    private static colors = [
        "#06b6d4",
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
    ];

    private static nextId = 1;

    static createRandom(): Piece {

        const shapes = ShapeRepository.shapes;

        const totalWeight =
            shapes.reduce(
                (sum, shape) => sum + shape.weight,
                0
            );

        let random =
            Math.random() * totalWeight;

        let definition = shapes[0];

        for (const shape of shapes) {

            random -= shape.weight;

            if (random <= 0) {

                definition = shape;

                break;

            }

        }

        return {

            id: String(this.nextId++),

            color:
                this.colors[
                    Math.floor(
                        Math.random() *
                        this.colors.length
                    )
                ],

            shape:
                definition.shape.map(
                    row => [...row]
                ),

            anchor: {
                row: definition.anchor.row,
                col: definition.anchor.col,
            },

        };

    }

    static createPieces(count = 3): Piece[] {

        return Array.from(
            { length: count },
            () => this.createRandom()
        );

    }

}