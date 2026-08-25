import { useState } from "react";

import type { GameResult } from "../models/GameResult";

import type { AdventureSessionState } from "../managers/AdventureSession";

import { completeStory, finishAdventureSession } from "../managers/AdventureSession";

import { StoryDialog } from "./StoryDialog";
import { MissionCard } from "./MissionCard";
import { GameLauncher } from "./GameLauncher";

type AdventurePhase = "story" | "mission" | "game";

interface AdventureScreenProps {
    session: AdventureSessionState;

    onExit?: () => void;
}

export function AdventureScreen({ session }: AdventureScreenProps) {
    const [phase, setPhase] = useState<AdventurePhase>(session.story ? "story" : "mission");

    function handleStoryComplete() {
        if (session.story) {
            completeStory(session.story.id);
        }

        setPhase("mission");
    }

    function handleMissionStart() {
        setPhase("game");
    }

    function handleGameComplete(result: GameResult) {
        console.log("GAME RESULT:", result);

        const adventureResult = finishAdventureSession(result);

        console.log("ADVENTURE RESULT:", adventureResult);
    }

    if (phase === "story" && session.story) {
        return <StoryDialog story={session.story} onComplete={handleStoryComplete} />;
    }

    if (phase === "mission") {
        return <MissionCard mission={session.mission} onStart={handleMissionStart} />;
    }

    return (
        <GameLauncher
            gameMode={session.mission.gameMode}

            target={session.mission.target}

            onComplete={handleGameComplete}
        />
    );
}
