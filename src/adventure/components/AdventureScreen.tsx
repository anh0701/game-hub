import { useState } from "react";

import type { GameResult } from "../models/GameResult";
import type { AdventureSessionState } from "../managers/AdventureSession";

import { completeStory, finishAdventureSession } from "../managers/AdventureSession";

import { StoryDialog } from "./StoryDialog";
import { GameLauncher } from "./GameLauncher";

import { FaArrowLeft, FaCat, FaPlay, FaTrophy } from "react-icons/fa6";

type AdventurePhase = "story" | "mission" | "game" | "complete";

interface AdventureScreenProps {
    session: AdventureSessionState;

    onExit?: () => void;
}

export function AdventureScreen({ session, onExit }: AdventureScreenProps) {
    const [phase, setPhase] = useState<AdventurePhase>(session.story ? "story" : "mission");

    const [activeStory, setActiveStory] = useState(session.story);

    function handleStoryComplete() {
        if (!activeStory) {
            setPhase("mission");
            return;
        }

        completeStory(activeStory.id);

        setActiveStory(undefined);

        if (phase === "story") {
            if (!session.story || activeStory.id === session.story.id) {
                setPhase("mission");
                return;
            }
        }

        setPhase("complete");
    }

    function handleMissionStart() {
        setPhase("game");
    }

    function handleGameComplete(result: GameResult) {
        console.log("GAME RESULT:", result);

        const adventureResult = finishAdventureSession(result);

        console.log("ADVENTURE RESULT:", adventureResult);

        if (!adventureResult.missionCompleted) {
            setPhase("mission");
            return;
        }

        if (adventureResult.story) {
            setActiveStory(adventureResult.story);

            setPhase("story");

            return;
        }

        setPhase("complete");
    }

    if (phase === "story" && activeStory) {
        return <StoryDialog story={activeStory} onComplete={handleStoryComplete} />;
    }

    if (phase === "game") {
        return (
            <GameLauncher
                gameMode={session.mission.gameMode}
                target={session.mission.target}
                onComplete={handleGameComplete}
            />
        );
    }

    if (phase === "complete") {
        return (
            <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
                <div className="mx-auto max-w-2xl">
                    {/* Back */}

                    {onExit && (
                        <button
                            type="button"
                            onClick={onExit}
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-white/40
                                transition
                                hover:text-cyan-400
                            "
                        >
                            <FaArrowLeft className="text-cyan-400" />
                            Adventure Map
                        </button>
                    )}

                    {/* Success */}

                    <section className="pt-10 text-center">
                        <div
                            className="
                                mx-auto
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-2xl
                                bg-emerald-400/10
                                text-4xl
                                text-emerald-400
                                ring-1
                                ring-emerald-400/20
                            "
                        >
                            <FaTrophy />
                        </div>

                        <p
                            className="
                                mt-6
                                text-xs
                                font-semibold
                                uppercase
                                tracking-widest
                                text-white/40
                            "
                        >
                            Mission Complete
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">Adventure Complete</h1>

                        <p className="mt-3 text-white/50">You completed the mission and rescued your friend.</p>
                    </section>

                    {/* Friend rescued */}

                    <section
                        className="
                            mt-8
                            rounded-2xl
                            bg-white/5
                            p-6
                            text-center
                            ring-1
                            ring-white/10
                        "
                    >
                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-amber-400/10
                                text-3xl
                                text-amber-400
                                ring-1
                                ring-amber-400/20
                            "
                        >
                            <FaCat />
                        </div>

                        <h2 className="mt-4 text-2xl font-bold">{session.mapId}</h2>

                        <p className="mt-2 text-white/50">Another friend has been rescued.</p>
                    </section>

                    {/* Back */}

                    {onExit && (
                        <button
                            type="button"
                            onClick={onExit}
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-white
                                px-5
                                py-3
                                font-semibold
                                text-slate-900
                                transition
                                hover:bg-white/90
                                active:scale-[0.98]
                            "
                        >
                            Back to Adventure Map
                        </button>
                    )}
                </div>
            </main>
        );
    }

    return (
        <main
            className="
                min-h-screen
                bg-slate-950
                px-4
                py-8
                text-white
            "
        >
            <div className="mx-auto max-w-2xl">
                {/* Back */}

                {onExit && (
                    <button
                        type="button"
                        onClick={onExit}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-white/40
                            transition
                            hover:text-cyan-400
                        "
                    >
                        <FaArrowLeft className="text-cyan-400" />
                        Adventure Map
                    </button>
                )}

                {/* MAP */}

                <section className="mt-8">
                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            text-white/40
                        "
                    >
                        Adventure
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">{getMapName(session.mapId)}</h1>

                    <p className="mt-3 leading-7 text-white/50">{getMapDescription(session.mapId)}</p>
                </section>

                {/* FRIEND */}

                <section
                    className="
                        mt-8
                        rounded-2xl
                        bg-white/5
                        p-6
                        ring-1
                        ring-white/10
                    "
                >
                    <div
                        className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-amber-400/10
                            text-3xl
                            text-amber-400
                            ring-1
                            ring-amber-400/20
                        "
                    >
                        <FaCat />
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-white/40">Your friend</p>

                        <h2 className="mt-1 text-2xl font-bold">Rescue {getFriendId(session.mapId)}</h2>

                        <p className="mt-2 text-white/50">Complete the mission to rescue your friend.</p>
                    </div>
                </section>

                {/* MISSION */}

                <section className="mt-6">
                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            text-white/40
                        "
                    >
                        Mission
                    </p>

                    <div
                        className="
                            mt-3
                            rounded-2xl
                            bg-white
                            p-6
                            text-slate-900
                        "
                    >
                        <h2 className="text-2xl font-bold">{session.mission.title}</h2>

                        <p className="mt-2 text-slate-500">{session.mission.description}</p>

                        {/* OBJECTIVE */}

                        <div
                            className="
                                mt-6
                                rounded-xl
                                bg-slate-100
                                p-4
                            "
                        >
                            <p className="text-sm text-slate-500">Your objective</p>

                            <p className="mt-1 text-xl font-bold">{getMissionTargetText(session.mission)}</p>
                        </div>

                        {/* TAGS */}

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span
                                className="
                                    rounded-lg
                                    bg-slate-100
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    uppercase
                                "
                            >
                                {session.mission.difficulty}
                            </span>

                            <span
                                className="
                                    rounded-lg
                                    bg-slate-100
                                    px-3
                                    py-1.5
                                    text-xs
                                "
                            >
                                {session.mission.gameMode}
                            </span>
                        </div>

                        {/* START */}

                        <button
                            type="button"
                            onClick={handleMissionStart}
                            className="
                                mt-6
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-slate-950
                                px-5
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-slate-800
                                active:scale-[0.98]
                            "
                        >
                            <FaPlay className="text-blue-400" />
                            Start Mission
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}

import { gameMaps } from "../data/maps";

function getMap(mapId: string) {
    return gameMaps.find((map) => map.id === mapId);
}

function getMapName(mapId: string): string {
    return getMap(mapId)?.name ?? mapId;
}

function getMapDescription(mapId: string): string {
    return getMap(mapId)?.description ?? "Explore this mysterious world and rescue your friend.";
}

function getFriendId(mapId: string): string {
    return getMap(mapId)?.friendId ?? "your friend";
}

function getMissionTargetText(mission: { target: number; gameMode: string }): string {
    if (mission.gameMode === "block-free") {
        return `Reach ${mission.target.toLocaleString()} points`;
    }

    if (mission.gameMode === "block-level") {
        return `Reach Level ${mission.target}`;
    }

    if (mission.gameMode === "sudoku") {
        return `Solve ${mission.target} Sudoku boards`;
    }

    if (mission.gameMode === "shield") {
        return `Reach ${mission.target.toLocaleString()} points`;
    }

    return `Complete the objective (${mission.target})`;
}
