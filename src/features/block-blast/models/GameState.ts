import type { Piece } from "./Piece";

export interface GameState {
    score: number;

    pieces: Piece[];

    gameOver: boolean;
}
