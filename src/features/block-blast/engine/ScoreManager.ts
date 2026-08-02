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

        const lines =
            clearedRows + clearedColumns;

        if (lines === 0) {
            return 0;
        }

        switch (lines) {

            case 1:
                return 10;

            case 2:
                return 25;

            case 3:
                return 45;

            default:
                return 70 + (lines - 4) * 30;

        }

    }

    reset(): void {
        this.score = 0;
    }

}