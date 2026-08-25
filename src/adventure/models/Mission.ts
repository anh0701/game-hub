import type { Difficulty, GameId, GameMode, MissionType } from "../../types/MissionType";

export interface Mission {
    id: string;

    gameId: GameId;

    type: MissionType;

    difficulty: Difficulty;

    target: number;

    title: string;

    description: string;

    gameMode: GameMode;
}
