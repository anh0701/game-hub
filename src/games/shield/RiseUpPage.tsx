import { useEffect, useRef, useState } from "react";

import Balloon from "./components/Balloon";
import Cloud from "./components/Cloud";
import Shield from "./components/shields/Shield";

import { useBoardSize } from "./hooks/useBoardSize";
import { useGameLoop } from "./hooks/useGameLoop";
import { usePointer } from "./hooks/usePointer";
import { updateGame } from "./hooks/updateGame";

import type { GameState } from "./models/GameState";
import type { GameSetup } from "./models/GameSetup";

import { GameOverModal } from "../../components/GameOverModal";
import type { GameResult } from "../../adventure/models/GameResult";

import Obstacle from "./components/obstacles/Obstacle";

interface RiseUpPageProps {
    setup: GameSetup;

    targetScore?: number;

    onComplete?: (result: GameResult) => void;
}

const obstacleTypeMap = {
    bugs: "bug",
    rocks: "rock",
    meteors: "meteor",
} as const;

const shieldColors = {
    white: "#ffffff",
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#facc15",
    purple: "#a855f7",
    orange: "#f97316",
};

function RiseUpPage({ setup, targetScore, onComplete }: RiseUpPageProps) {
    const { ref, size } = useBoardSize<HTMLDivElement>();

    const pointer = usePointer();

    const [game, setGame] = useState<GameState>(createInitialGame);

    const completionReportedRef = useRef(false);

    const shieldColor = shieldColors[setup.shieldColor];

    function createInitialGame(): GameState {
        const balloon = {
            x: 0,
            y: 0,
        };

        return {
            balloon,

            shield: {
                x: balloon.x,
                y: balloon.y,
                radius: 35,
            },

            camera: {
                x: 0,
                y: 0,
                speed: 120,
            },

            zones: [],

            score: 0,

            gameOver: false,
        };
    }

    const missionCompleted = targetScore !== undefined && game.score >= targetScore;

    useEffect(() => {
        if (!missionCompleted) {
            return;
        }

        if (completionReportedRef.current) {
            return;
        }

        completionReportedRef.current = true;

        onComplete?.({
            gameId: "shield",
            gameMode: "shield",
            score: Math.floor(game.score),
        });
    }, [missionCompleted, game.score, onComplete]);

    const handleRestart = () => {
        completionReportedRef.current = false;

        setGame({
            ...createInitialGame(),

            balloon: {
                x: size.width / 2,
                y: size.height * 0.8,
            },

            shield: {
                x: size.width / 2,
                y: size.height * 0.65,
                radius: 35,
            },
        });
    };

    useEffect(() => {
        if (size.width === 0 || size.height === 0) {
            return;
        }

        setGame((prev) => {
            const balloonX = size.width / 2;

            const balloonY = size.height * 0.8;

            return {
                ...prev,

                balloon: {
                    ...prev.balloon,
                    x: balloonX,
                    y: balloonY,
                },

                shield: {
                    ...prev.shield,
                    x: balloonX,
                    y: size.height * 0.65,
                },
            };
        });
    }, [size]);

    useGameLoop((deltaTime) => {
        if (missionCompleted) {
            return;
        }

        setGame((prev) => updateGame(prev, deltaTime, pointer, size));
    });

    return (
        <div
            ref={ref}
            className="
                touch-none
                relative
                h-screen
                w-screen
                overflow-hidden
                bg-sky-300
            "
        >
            {game.zones.map((zone) => zone.clouds.map((cloud) => <Cloud key={cloud.id} cloud={cloud} />))}

            {game.zones.map((zone) =>
                zone.obstacles.map((obstacle) => (
                    <Obstacle
                        key={obstacle.id}
                        obstacle={obstacle}
                        cameraY={game.camera.y}
                        type={obstacleTypeMap[setup.mapType]}
                    />
                ))
            )}

            {/* SCORE */}

            <div
                className="
                    absolute
                    left-4
                    top-4
                    z-50
                    rounded-lg
                    bg-white/80
                    px-3
                    py-2
                    text-sm
                    shadow
                "
            >
                Score: {Math.floor(game.score)}
            </div>

            {/* MISSION */}

            {targetScore !== undefined && (
                <div
                    className="
                        absolute
                        right-4
                        top-4
                        z-50
                        rounded-lg
                        bg-white/80
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-slate-800
                        shadow
                    "
                >
                    Mission: {Math.min(Math.floor(game.score), targetScore)}/{targetScore}
                </div>
            )}

            <Shield shield={game.shield} type={setup.shieldType} color={shieldColor} />

            <Balloon balloon={game.balloon} />

            {/* Mission complete */}

            {missionCompleted && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        px-4
                    "
                >
                    <div
                        className="
                            w-full
                            max-w-sm
                            rounded-2xl
                            bg-slate-900
                            p-6
                            text-center
                            shadow-2xl
                            ring-1
                            ring-white/10
                        "
                    >
                        <div className="text-sm font-medium tracking-widest text-emerald-400">MISSION COMPLETE</div>

                        <h2 className="mt-2 text-2xl font-bold text-white">Finn is safe!</h2>

                        <p className="mt-2 text-sm text-white/50">
                            You successfully protected your way through the sky.
                        </p>

                        <div className="mt-5 text-3xl font-bold text-white">{Math.floor(game.score)}</div>

                        <div className="mt-1 text-xs text-white/40">SCORE</div>

                        <button
                            type="button"
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-white
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-slate-900
                                transition
                                hover:bg-white/90
                            "
                            onClick={() => {
                                onComplete?.({
                                    gameId: "shield",
                                    gameMode: "shield",
                                    score: Math.floor(game.score),
                                });
                            }}
                        >
                            Continue Adventure
                        </button>
                    </div>
                </div>
            )}

            {/* Normal game over */}

            {game.gameOver && !missionCompleted && (
                <GameOverModal score={Math.floor(game.score)} onRestart={handleRestart} />
            )}
        </div>
    );
}

export default RiseUpPage;
