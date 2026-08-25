import type { GameId, GameMode } from "../../types/MissionType";

export interface GameResult {
    gameId: GameId;

    gameMode: GameMode;

    score?: number;

    level?: number;

    boardsCompleted?: number;

    surviveTime?: number;
}
