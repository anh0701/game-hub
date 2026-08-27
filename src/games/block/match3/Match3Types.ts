export interface Match3Position {
    row: number;
    col: number;
}

export interface Match3Group {
    color: string;
    cells: Match3Position[];
}

export type Match3Animation = "idle" | "clearing" | "falling" | "spawning";

export interface Match3MoveResult {
    success: boolean;

    swapped: boolean;

    clearedBlocks: Match3Position[];

    scoreGained: number;

    score: number;

    gameOver: boolean;
}
