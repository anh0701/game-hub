import type { GameResult } from "../models/GameResult";
import type { PlayerProgress } from "../models/PlayerProgress";

import { evaluateMission } from "./MissionEvaluator";

import {
    clearCurrentMission,
    completeMission,
    recordGameResult,
    rescueFriend,
    saveProgress,
    setCurrentMap,
    setCurrentMission,
    unlockMap,
    updateLastVisit,
} from "./ProgressManager";

import { gameMaps } from "../data/maps";
import { generateMission } from "./MissionGenerator";
import type { AdventureResult } from "../models/AdventureResult";
import { ADVENTURE_GAME_IDS } from "../data/availableGames";

export function startMap(progress: PlayerProgress, mapId: string): PlayerProgress {
    const map = gameMaps.find((item) => item.id === mapId);

    if (!map) {
        throw new Error(`Map not found: ${mapId}`);
    }

    if (!ADVENTURE_GAME_IDS.includes(map.gameId)) {
        throw new Error(`Game is not ready: ${map.gameId}`);
    }

    if (!progress.unlockedMapIds.includes(mapId)) {
        throw new Error(`Map is locked: ${mapId}`);
    }

    if (progress.currentMission && progress.currentMapId === mapId) {
        return progress;
    }

    const mission = generateMission(map.gameId);

    let updatedProgress = setCurrentMap(progress, mapId);

    updatedProgress = setCurrentMission(updatedProgress, mission);

    updatedProgress = updateLastVisit(updatedProgress);

    saveProgress(updatedProgress);

    return updatedProgress;
}

export function finishGame(progress: PlayerProgress, result: GameResult): AdventureResult {
    const mission = progress.currentMission;

    if (!mission) {
        throw new Error("No active mission.");
    }

    const missionCompleted = evaluateMission(mission, result);

    let updatedProgress = recordGameResult(progress, result.gameId, result.score ?? 0);

    if (!missionCompleted) {
        saveProgress(updatedProgress);

        return {
            missionCompleted: false,
            rescuedFriend: false,
            progress: updatedProgress,
        };
    }

    const map = gameMaps.find((item) => item.id === progress.currentMapId);

    if (!map) {
        throw new Error(`Map not found: ${progress.currentMapId}`);
    }

    const alreadyRescued = progress.rescuedFriendIds.includes(map.friendId);

    updatedProgress = completeMission(updatedProgress, mission.id);

    if (!alreadyRescued) {
        updatedProgress = rescueFriend(updatedProgress, map.friendId);
    }

    const nextMap = getNextMap(map.id);

    if (!alreadyRescued && nextMap) {
        updatedProgress = unlockMap(updatedProgress, nextMap.id);
    }

    updatedProgress = clearCurrentMission(updatedProgress);

    saveProgress(updatedProgress);

    return {
        missionCompleted: true,

        rescuedFriend: !alreadyRescued,

        unlockedMapId: !alreadyRescued ? nextMap?.id : undefined,

        rescuedFriendId: !alreadyRescued ? map.friendId : undefined,

        progress: updatedProgress,
    };
}

function getNextMap(currentMapId: string) {
    const currentMap = gameMaps.find((map) => map.id === currentMapId);

    if (!currentMap) {
        return undefined;
    }

    return gameMaps.find((map) => map.order === currentMap.order + 1);
}
