import type { Difficulty, GameMode, MissionType } from "../../types/MissionType";

import type { GameId } from "../../types/MissionType";

export interface MissionTemplate {
    id: string;

    gameId: GameId;

    type: MissionType;

    difficulty: Difficulty;

    minTarget: number;

    maxTarget: number;

    title: string;

    description: string;

    gameMode: GameMode;
}
