import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { gameMaps } from "../adventure/data/maps";
import { stories } from "../adventure/data/stories";

import { loadProgress } from "../adventure/managers/ProgressManager";
import { finishGame, startMap } from "../adventure/managers/AdventureManager";

import type { GameResult } from "../adventure/models/GameResult";
import type { StoryNode } from "../adventure/models/StoryNode";

import BlockBlast from "../games/block/pages/BlockBlast";
import LevelBlockBlast from "../games/block/pages/LevelBlockBlast";
import RiseUpModePage from "../games/shield/RiseUpModePage";
import { SudokuPage } from "../games/sudoku/pages/SudokuPage";

import { StoryDialog } from "../adventure/components/StoryDialog";

export default function AdventurePage() {
    const { mapId } = useParams();

    const navigate = useNavigate();

    const [progress, setProgress] = useState(loadProgress());

    const [playing, setPlaying] = useState(false);

    const [adventureResult, setAdventureResult] = useState<ReturnType<typeof finishGame> | null>(null);

    const [activeStory, setActiveStory] = useState<StoryNode | null>(() => {
        if (!mapId) {
            return null;
        }

        return getStory(mapId, "beforeMission");
    });

    const map = gameMaps.find((item) => item.id === mapId);

    if (!map) {
        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-3xl font-bold">Map not found</h1>

                    <button
                        type="button"
                        onClick={() => navigate("/world")}
                        className="
                            mt-6
                            rounded-xl
                            bg-white
                            px-5
                            py-3
                            font-semibold
                            text-slate-900
                        "
                    >
                        Back to World
                    </button>
                </div>
            </main>
        );
    }

    if (activeStory) {
        return (
            <StoryDialog
                story={activeStory}
                onComplete={() => {
                    setActiveStory(null);
                }}
            />
        );
    }

    if (adventureResult?.missionCompleted) {
        const nextMap = adventureResult.unlockedMapId
            ? gameMaps.find((item) => item.id === adventureResult.unlockedMapId)
            : undefined;

        return (
            <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
                <div className="mx-auto max-w-2xl">
                    {/* Success */}

                    <section className="pt-8 text-center">
                        <div className="text-6xl">🎉</div>

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

                        <h1 className="mt-2 text-4xl font-bold">{map.name}</h1>

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
                        <div className="text-6xl">🐱</div>

                        <h2 className="mt-4 text-2xl font-bold">{map.friendId} is safe!</h2>

                        <p className="mt-2 text-white/50">Another friend has been rescued.</p>
                    </section>

                    {/* Next map */}

                    {nextMap ? (
                        <section
                            className="
                                mt-6
                                rounded-2xl
                                bg-white
                                p-6
                                text-slate-900
                            "
                        >
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-widest
                                    text-slate-400
                                "
                            >
                                New World Unlocked
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">{nextMap.name}</h2>

                            <p className="mt-2 text-slate-500">{nextMap.description}</p>

                            <button
                                type="button"
                                onClick={() => {
                                    const newProgress = startMap(adventureResult.progress, nextMap.id);

                                    setProgress(newProgress);

                                    setAdventureResult(null);

                                    setPlaying(false);

                                    navigate(`/adventure/${nextMap.id}`);
                                }}
                                className="
                                    mt-6
                                    w-full
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
                                Continue Adventure
                            </button>
                        </section>
                    ) : (
                        <section
                            className="
                                mt-6
                                rounded-2xl
                                bg-white/5
                                p-6
                                text-center
                                ring-1
                                ring-white/10
                            "
                        >
                            <div className="text-4xl">🌟</div>

                            <h2 className="mt-3 text-xl font-bold">Adventure Complete!</h2>

                            <p className="mt-2 text-white/50">You rescued everyone.</p>

                            <button
                                type="button"
                                onClick={() => navigate("/world")}
                                className="
                                    mt-5
                                    rounded-xl
                                    bg-white
                                    px-5
                                    py-3
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                Back to World
                            </button>
                        </section>
                    )}
                </div>
            </main>
        );
    }

    if (!progress.currentMission) {
        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-3xl font-bold">No Mission</h1>

                    <p className="mt-2 text-white/50">There is no active mission for this adventure.</p>

                    <button
                        type="button"
                        onClick={() => navigate("/world")}
                        className="
                            mt-6
                            rounded-xl
                            bg-white
                            px-5
                            py-3
                            font-semibold
                            text-slate-900
                        "
                    >
                        Back to World
                    </button>
                </div>
            </main>
        );
    }

    const mission = progress.currentMission;

    if (playing) {
        const handleComplete = (result: GameResult) => {
            const resultData = finishGame(progress, result);

            setProgress(resultData.progress);

            setPlaying(false);

            setAdventureResult(resultData);

            const afterStory = getStory(map.id, "afterMission");

            if (afterStory) {
                setActiveStory(afterStory);
            }
        };

        if (mission.gameId === "block" && mission.gameMode === "block-free") {
            return <BlockBlast targetScore={mission.target} onComplete={handleComplete} />;
        }

        if (mission.gameId === "block" && mission.gameMode === "block-level") {
            return <LevelBlockBlast targetLevel={mission.target} onComplete={handleComplete} />;
        }

        if (mission.gameId === "shield" && mission.gameMode === "shield") {
            return <RiseUpModePage targetScore={mission.target} onComplete={handleComplete} />;
        }

        if (mission.gameId === "sudoku" && mission.gameMode === "sudoku") {
            return <SudokuPage targetBoards={mission.target} onComplete={handleComplete} />;
        }

        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <h1 className="text-2xl font-bold">Game mode not connected</h1>

                <p className="mt-2 text-white/50">{mission.gameMode}</p>
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

                <button
                    type="button"
                    onClick={() => navigate("/world")}
                    className="
                        text-sm
                        text-white/40
                        transition
                        hover:text-white
                    "
                >
                    ← Adventure Map
                </button>

                {/* Map */}

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

                    <h1 className="mt-2 text-4xl font-bold">{map.name}</h1>

                    <p className="mt-3 leading-7 text-white/50">{map.description}</p>
                </section>

                {/* Friend */}

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
                    <div className="text-5xl">🐱</div>

                    <div className="mt-4">
                        <p className="text-sm text-white/40">Your friend</p>

                        <h2 className="mt-1 text-2xl font-bold">Rescue {map.friendId}</h2>

                        <p className="mt-2 text-white/50">Complete the mission to rescue your friend.</p>
                    </div>
                </section>

                {/* Mission */}

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
                        <h2 className="text-2xl font-bold">{mission.title}</h2>

                        <p className="mt-2 text-slate-500">{mission.description}</p>

                        {/* Objective */}

                        <div
                            className="
                                mt-6
                                rounded-xl
                                bg-slate-100
                                p-4
                            "
                        >
                            <p className="text-sm text-slate-500">Your objective</p>

                            <p className="mt-1 text-xl font-bold">{getMissionTargetText(mission)}</p>
                        </div>

                        {/* Tags */}

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
                                {mission.difficulty}
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
                                {mission.gameMode}
                            </span>
                        </div>

                        {/* Start */}

                        <button
                            type="button"
                            onClick={() => setPlaying(true)}
                            className="
                                mt-6
                                w-full
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
                            Start Mission
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}

/*
 * Find story for current map.
 */
function getStory(mapId: string, trigger: "beforeMission" | "afterMission"): StoryNode | null {
    return stories.find((story) => story.mapId === mapId && story.trigger === trigger) ?? null;
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
