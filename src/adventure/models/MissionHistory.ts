import type { Difficulty, GameId, MissionType } from "../../types/MissionType";

export interface MissionHistory {
    id: string;

    gameId: GameId;

    type: MissionType;

    target: number;

    difficulty: Difficulty;

    completed: boolean;

    createdAt: string;

    completedAt?: string;
}
