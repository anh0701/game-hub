import type { Piece } from "../models/Piece";
import type { BoardEngine } from "./BoardEngine";

export class GameRule {
    static hasMove(board: BoardEngine, pieces: Piece[]): boolean {
        for (const piece of pieces) {
            for (let row = 0; row < board.board.rows; row++) {
                for (let col = 0; col < board.board.cols; col++) {
                    if (board.canPlace(piece, row, col)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
