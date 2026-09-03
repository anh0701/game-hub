export type MissionType = "score" | "level" | "boards" | "survive";

export type Difficulty = "easy" | "normal" | "hard" | "extreme";

export interface Mission {
    id: string;

    type: MissionType;

    difficulty: Difficulty;

    target: number;

    title: string;

    description: string;
}

export type GameId = "block" | "sudoku" | "shield" | "word-memory";

export type GameMode =
    "block-free" | "block-level" | "sudoku" | "shield" | "block-match3" | "block-match3-level" | "word-memory";
