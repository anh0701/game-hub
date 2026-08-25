import type { GameId } from "../../types/MissionType";
import type { Mission } from "./Mission";

export interface GameStats {
    gamesPlayed: number;
    bestScore: number;
}

export interface PlayerProgress {
    currentMapId: string;

    unlockedMapIds: string[];

    rescuedFriendIds: string[];

    completedMissionIds: string[];

    currentMission?: Mission;

    stats: Record<GameId, GameStats>;

    firstVisit: string;

    lastVisit: string;

    seenStoryIds: string[];
}
