import type { Piece } from "../models/Piece";

export class ScoreManager {

    private score = 0;

    getScore(): number {
        return this.score;
    }

    add(score: number): void {
        this.score += score;
    }

    calculate(
        piece: Piece,
        clearedRows: number,
        clearedColumns: number
    ): number {

        let blocks = 0;

        for (const row of piece.shape) {

            for (const cell of row) {

                if (cell === 1) {
                    blocks++;
                }

            }

        }

        const clearedLines =
            clearedRows + clearedColumns;

        return blocks + clearedLines * 10;

    }

    reset(): void {
        this.score = 0;
    }

}