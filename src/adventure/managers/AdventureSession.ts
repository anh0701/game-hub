import type { GameId } from "../../types/MissionType";
import type { GameResult } from "../models/GameResult";
import type { Mission } from "../models/Mission";
import type { StoryNode } from "../models/StoryNode";

import { finishGame, startMap } from "./AdventureManager";

import { abandonMission, loadProgress, markStorySeen, saveProgress } from "./ProgressManager";
import { getUnseenStory } from "./StoryManager";

export interface AdventureSessionState {
    mapId: string;
    gameId: GameId;
    mission: Mission;
    story?: StoryNode;
}

let session: AdventureSessionState | null = null;

export function startAdventureSession(mapId: string): AdventureSessionState {
    const progress = loadProgress();

    const story = getUnseenStory(mapId, "beforeMission", progress);

    const updatedProgress = startMap(progress, mapId);

    const mission = updatedProgress.currentMission;

    if (!mission) {
        throw new Error("Failed to create mission.");
    }

    session = {
        mapId,

        gameId: mission.gameId,

        mission,

        story,
    };

    return session;
}

export function completeStory(storyId: string): void {
    const progress = loadProgress();

    const updatedProgress = markStorySeen(progress, storyId);

    saveProgress(updatedProgress);
}

export function getAdventureSession(): AdventureSessionState | null {
    return session;
}

export function finishAdventureSession(result: GameResult) {
    if (!session) {
        throw new Error("No active adventure session.");
    }

    const progress = loadProgress();

    const adventureResult = finishGame(progress, result);

    console.log("=== FINISH ADVENTURE ===");
    console.log("session.mapId:", session.mapId);
    console.log("missionCompleted:", adventureResult.missionCompleted);
    console.log("progress:", adventureResult.progress);

    let story: StoryNode | undefined;

    if (adventureResult.missionCompleted) {
        story = getUnseenStory(session.mapId, "afterMission", adventureResult.progress);

        console.log("AFTER MISSION STORY:", story);
    }

    session = null;

    return {
        ...adventureResult,
        story,
    };
}

export function cancelAdventureSession(): void {
    const progress = loadProgress();

    const updatedProgress = abandonMission(progress);

    saveProgress(updatedProgress);

    session = null;
}
