import { useState } from "react";

import type { GameMap } from "../adventure/models/Map";
import type { GameResult } from "../adventure/models/GameResult";

import { loadProgress } from "../adventure/managers/ProgressManager";
import { finishGame } from "../adventure/managers/AdventureManager";

import BlockBlast from "../games/block/pages/BlockBlast";

interface AdventureMapViewProps {
    map: GameMap;
}

export default function AdventureMapView({ map }: AdventureMapViewProps) {
    const [gameStarted, setGameStarted] = useState(false);

    const progress = loadProgress();

    const mission = progress.currentMission;

    if (!mission) {
        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-2xl font-bold">No Active Mission</h1>

                    <p className="mt-2 text-white/50">There is no active mission for this adventure.</p>
                </div>
            </main>
        );
    }

    if (mission.gameId !== map.gameId) {
        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-2xl font-bold">Invalid Mission</h1>

                    <p className="mt-2 text-white/50">This mission does not belong to this map.</p>
                </div>
            </main>
        );
    }

    if (gameStarted) {
        if (mission.gameId === "block") {
            return (
                <BlockBlast
                    targetScore={mission.target}
                    onComplete={(result: GameResult) => {
                        const currentProgress = loadProgress();

                        finishGame(currentProgress, result);

                        setGameStarted(false);
                    }}
                />
            );
        }

        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-2xl font-bold">Game coming soon</h1>

                    <p className="mt-2 text-white/50">{mission.gameId}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
            <div className="mx-auto max-w-2xl">
                {/* MAP */}

                <p className="text-sm uppercase tracking-widest text-white/40">{map.name}</p>

                <h1 className="mt-2 text-3xl font-bold">Rescue {map.friendId}</h1>

                <p className="mt-2 text-white/50">Complete the mission to rescue your friend.</p>

                {/* MISSION */}

                <div className="mt-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-widest text-white/30">Mission</p>

                    <h2 className="mt-3 text-xl font-bold">{mission.title}</h2>

                    <p className="mt-2 text-white/50">{mission.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs capitalize">
                            {mission.difficulty}
                        </span>

                        <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs">{mission.gameMode}</span>

                        <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs">Target: {mission.target}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setGameStarted(true);
                        }}
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
                        Start Mission
                    </button>
                </div>
            </div>
        </main>
    );
}
