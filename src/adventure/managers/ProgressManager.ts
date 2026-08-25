import type { GameId } from "../../types/MissionType";
import type { Mission } from "../models/Mission";
import type { PlayerProgress } from "../models/PlayerProgress";

const STORAGE_KEY = "gamehub_progress";

function createDefaultProgress(): PlayerProgress {
    const now = new Date().toISOString();

    return {
        currentMapId: "block-world",

        unlockedMapIds: ["block-world"],

        rescuedFriendIds: [],

        completedMissionIds: [],

        stats: {
            block: {
                gamesPlayed: 0,
                bestScore: 0,
            },

            sudoku: {
                gamesPlayed: 0,
                bestScore: 0,
            },

            shield: {
                gamesPlayed: 0,
                bestScore: 0,
            },
        },

        firstVisit: now,
        lastVisit: now,

        seenStoryIds: [],
    };
}

export function loadProgress(): PlayerProgress {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return createDefaultProgress();
    }

    try {
        return JSON.parse(raw) as PlayerProgress;
    } catch {
        console.warn("Invalid save data. Creating new progress.");

        return createDefaultProgress();
    }
}

export function saveProgress(progress: PlayerProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function unlockMap(progress: PlayerProgress, mapId: string): PlayerProgress {
    if (progress.unlockedMapIds.includes(mapId)) {
        return progress;
    }

    return {
        ...progress,

        unlockedMapIds: [...progress.unlockedMapIds, mapId],
    };
}

export function rescueFriend(progress: PlayerProgress, friendId: string): PlayerProgress {
    if (progress.rescuedFriendIds.includes(friendId)) {
        return progress;
    }

    return {
        ...progress,

        rescuedFriendIds: [...progress.rescuedFriendIds, friendId],
    };
}

export function completeMission(progress: PlayerProgress, missionId: string): PlayerProgress {
    if (progress.completedMissionIds.includes(missionId)) {
        return progress;
    }

    return {
        ...progress,

        completedMissionIds: [...progress.completedMissionIds, missionId],
    };
}

export function recordGameResult(progress: PlayerProgress, gameId: GameId, score: number): PlayerProgress {
    const stats = progress.stats[gameId];

    return {
        ...progress,

        stats: {
            ...progress.stats,

            [gameId]: {
                ...stats,

                gamesPlayed: stats.gamesPlayed + 1,

                bestScore: Math.max(stats.bestScore, score),
            },
        },
    };
}

export function updateLastVisit(progress: PlayerProgress): PlayerProgress {
    return {
        ...progress,
        lastVisit: new Date().toISOString(),
    };
}

export function setCurrentMap(progress: PlayerProgress, mapId: string): PlayerProgress {
    return {
        ...progress,
        currentMapId: mapId,
    };
}

export function setCurrentMission(progress: PlayerProgress, mission: Mission): PlayerProgress {
    return {
        ...progress,
        currentMission: mission,
    };
}

export function clearCurrentMission(progress: PlayerProgress): PlayerProgress {
    return {
        ...progress,
        currentMission: undefined,
    };
}

export function abandonMission(progress: PlayerProgress): PlayerProgress {
    return {
        ...progress,
        currentMission: undefined,
    };
}

export function markStorySeen(progress: PlayerProgress, storyId: string): PlayerProgress {
    if (progress.seenStoryIds.includes(storyId)) {
        return progress;
    }

    return {
        ...progress,

        seenStoryIds: [...progress.seenStoryIds, storyId],
    };
}
