export interface PlayResult {
    success: boolean;

    clearedRows: number[];

    clearedColumns: number[];

    scoreGained: number;

    gameOver: boolean;
}
