import { BoardEngine } from "./BoardEngine";

import type { Piece } from "../models/Piece";

export class GameRule {

    static isGameOver(
        board: BoardEngine,
        pieces: Piece[]
    ): boolean {

        for (const piece of pieces) {

            for (
                let row = 0;
                row < board.board.rows;
                row++
            ) {

                for (
                    let col = 0;
                    col < board.board.cols;
                    col++
                ) {

                    if (
                        board.canPlace(
                            piece,
                            row,
                            col
                        )
                    ) {

                        return false;

                    }

                }

            }

        }

        return true;

    }

}