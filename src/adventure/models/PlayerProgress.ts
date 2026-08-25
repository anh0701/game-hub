import type { GameId } from "../../types/MissionType";

export interface GameStats {
    gamesPlayed: number;
    bestScore: number;
}

export interface PlayerProgress {
    currentMapId: string;

    unlockedMapIds: string[];

    rescuedFriendIds: string[];

    completedMissionIds: string[];

    stats: Record<GameId, GameStats>;

    firstVisit: string;

    lastVisit: string;
}
