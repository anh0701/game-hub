import { useEffect, useState } from "react";
import {
    FiCheck,
    FiClock,
    FiTarget,
} from "react-icons/fi";

import Layout from "../../../components/Layout";
import { GameOverModal } from "../../../components/GameOverModal";

import Match3Board from "../components/Match3Board";
import { useMatch3 } from "../hooks/useMatch3";


import type { GameResult } from "../../../adventure/models/GameResult";
import { MATCH3_LEVELS } from "../constants/match3Levels";

interface Match3LevelProps {
    onComplete?: (result: GameResult) => void;
}

export default function Match3Level({
    onComplete,
}: Match3LevelProps) {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    const level = MATCH3_LEVELS[currentLevelIndex];

    const isLastLevel =
        currentLevelIndex === MATCH3_LEVELS.length - 1;

    const {
        board,
        score,
        selectedPosition,
        animation,
        clearingPositions,
        fallingPositions,
        spawningPositions,

        gameOver,

        levelPassed,
        levelFailed,

        timeRemaining,
        objectives,

        handleCellClick,
        restart,
    } = useMatch3({
        level,
        levelKey: level.id,
    });

    useEffect(() => {
        if (!levelPassed || !isLastLevel) {
            return;
        }

        onComplete?.({
            gameId: "block",
            gameMode: "block-match3",
            score,
        });
    }, [
        levelPassed,
        isLastLevel,
        score,
        onComplete,
    ]);

    const handleNextLevel = () => {
        if (isLastLevel) {
            return;
        }

        setCurrentLevelIndex((index) => index + 1);
    };

    return (
        <Layout>
            <main
                className="
                    mx-auto
                    flex
                    h-[100dvh]
                    w-full
                    max-w-4xl
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    px-3
                    py-4
                    sm:px-6
                "
            >

                <div className="mb-3 text-center">
                    <div
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-slate-500
                        "
                    >
                        Level {level.id}
                    </div>

                    <h1
                        className="
                            mt-1
                            text-xl
                            font-bold
                            text-slate-100
                        "
                    >
                        Match 3
                    </h1>
                </div>

                <div
                    className="
                        mb-3
                        flex
                        w-full
                        max-w-md
                        items-stretch
                        gap-3
                    "
                >
                    {/* TARGET */}

                    <div
                        className="
                            flex
                            min-w-0
                            flex-1
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-slate-700/60
                            bg-slate-900/70
                            px-4
                            py-3
                            shadow-lg
                        "
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-amber-400/10
                                text-amber-400
                            "
                        >
                            <FiTarget size={21} />
                        </div>

                        <div className="min-w-0">
                            <div
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Target
                            </div>

                            {objectives.map((objective, index) => (
                                <div
                                    key={`${objective.type}-${index}`}
                                    className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-slate-200
                                    "
                                >
                                    Clear {objective.target}
                                    {objective.color
                                        ? ` ${objective.color}`
                                        : ""}{" "}
                                    blocks
                                </div>
                            ))}

                            <div
                                className="
                                    mt-0.5
                                    text-xs
                                    font-medium
                                    text-slate-400
                                "
                            >
                                {objectives.map((objective, index) => (
                                    <span
                                        key={`${objective.type}-progress-${index}`}
                                    >
                                        {objective.current} /{" "}
                                        {objective.target}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TIMER */}

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-slate-700/60
                            bg-slate-900/70
                            px-4
                            py-3
                            shadow-lg
                        "
                    >
                        <FiClock
                            size={20}
                            className={
                                timeRemaining <= 10
                                    ? "text-red-400"
                                    : "text-slate-400"
                            }
                        />

                        <div>
                            <div
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                "
                            >
                                Time
                            </div>

                            <div
                                className={`
                                    text-sm
                                    font-bold
                                    ${
                                        timeRemaining <= 10
                                            ? "text-red-400"
                                            : "text-slate-200"
                                    }
                                `}
                            >
                                {timeRemaining}s
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="
                        mb-3
                        flex
                        flex-wrap
                        justify-center
                        gap-2
                    "
                >
                    {objectives.map((objective, index) => (
                        <div
                            key={`${objective.type}-${index}`}
                            className={`
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                ${
                                    objective.completed
                                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                        : "border-slate-700 bg-slate-900/60 text-slate-400"
                                }
                            `}
                        >
                            {objective.completed ? (
                                <FiCheck size={13} />
                            ) : (
                                <FiTarget size={13} />
                            )}

                            <span>
                                {objective.current} /{" "}
                                {objective.target}
                            </span>
                        </div>
                    ))}
                </div>

                <div
                    className="
                        mb-2
                        text-center
                        text-sm
                        font-medium
                        text-slate-400
                    "
                >
                    Select two adjacent blocks to swap
                </div>


                <Match3Board
                    board={board}
                    selectedPosition={selectedPosition}
                    animation={animation}
                    clearingPositions={clearingPositions}
                    fallingPositions={fallingPositions}
                    spawningPositions={spawningPositions}
                    onCellClick={handleCellClick}
                />


                <div
                    className="
                        mt-3
                        text-center
                        text-xs
                        text-slate-500
                    "
                >
                    Match 3 or more blocks of the same color
                </div>

                {levelPassed && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-50
                            flex
                            items-center
                            justify-center
                            bg-black/60
                            px-4
                        "
                    >
                        <div
                            className="
                                w-full
                                max-w-sm
                                rounded-2xl
                                border
                                border-slate-700
                                bg-slate-900
                                p-6
                                text-center
                                shadow-2xl
                            "
                        >
                            <div
                                className="
                                    mx-auto
                                    mb-3
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-emerald-500/10
                                    text-emerald-400
                                "
                            >
                                <FiCheck size={28} />
                            </div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-slate-100
                                "
                            >
                                Level Complete!
                            </h2>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-400
                                "
                            >
                                Level {level.id} completed
                            </p>

                            {!isLastLevel ? (
                                <button
                                    type="button"
                                    onClick={handleNextLevel}
                                    className="
                                        mt-5
                                        w-full
                                        rounded-xl
                                        bg-emerald-500
                                        px-4
                                        py-3
                                        text-sm
                                        font-bold
                                        text-white
                                        transition
                                        hover:bg-emerald-400
                                    "
                                >
                                    Next Level
                                </button>
                            ) : (
                                <div
                                    className="
                                        mt-5
                                        text-sm
                                        font-semibold
                                        text-emerald-400
                                    "
                                >
                                    All levels completed!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {gameOver && !levelPassed && (
                    <GameOverModal
                        score={score}
                        onRestart={restart}
                    />
                )}

                {levelFailed && !levelPassed && !gameOver && (
                    <GameOverModal
                        score={score}
                        onRestart={restart}
                    />
                )}
            </main>
        </Layout>
    );
}