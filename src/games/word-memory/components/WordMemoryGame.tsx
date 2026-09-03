import { useMemo } from "react";

import { VOCABULARY } from "../data/vocabulary";

import { useWordMemory } from "../hooks/useWordMemory";

import { MemoryBoard } from "./MemoryBoard";

import { WordMemoryHUD } from "./WordMemoryHUD";
import { FiCheckCircle, FiRotateCcw, FiZap } from "react-icons/fi";

interface WordMemoryGameProps {
    pairCount?: number;

    memorizeTime?: number;

    onComplete?: () => void;
}

export function WordMemoryGame({
    pairCount = 4,

    memorizeTime = 10,

    onComplete,
}: WordMemoryGameProps) {
    const vocabulary = useMemo(() => {
        const shuffled = [...VOCABULARY].sort(() => Math.random() - 0.5);

        return shuffled.slice(0, pairCount);
    }, [pairCount]);

    const {
        cards,

        phase,

        memorizeTimeRemaining,

        matchedPairs,

        totalPairs,

        moves,

        wrongMatches,

        currentCombo,

        score,

        isChecking,

        handleCardClick,

        startPlaying,

        restart,
    } = useWordMemory({
        vocabulary,

        memorizeTime,

        onComplete,
    });

    return (
        <div
            className="
                min-h-screen
                bg-slate-950
                px-4
                py-6
                text-white
                sm:px-6
                sm:py-10
            "
        >
            <div
                className="
                    mx-auto
                    w-full
                    max-w-3xl
                "
            >
                <WordMemoryHUD
                    phase={phase}
                    memorizeTimeRemaining={memorizeTimeRemaining}
                    matchedPairs={matchedPairs}
                    totalPairs={totalPairs}
                    moves={moves}
                    wrongMatches={wrongMatches}
                    currentCombo={currentCombo}
                    score={score}
                />

                <div className="mt-6">
                    <MemoryBoard
                        cards={cards}
                        disabled={phase !== "playing" || isChecking}
                        onCardClick={handleCardClick}
                    />
                </div>

                {phase === "memorizing" && (
                    <div
                        className="
                            mt-6
                            text-center
                        "
                    >
                        <p
                            className="
                                mb-4
                                text-sm
                                text-slate-400
                            "
                        >
                            Remember the positions of the words and their meanings.
                        </p>

                        <button
                            type="button"
                            onClick={startPlaying}
                            className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-indigo-500
                            px-6
                            py-3
                            font-bold
                            text-white
                            transition
                            hover:bg-indigo-400
                        "
                        >
                            <FiZap />
                            I'm Ready
                        </button>
                    </div>
                )}

                {phase === "completed" && (
                    <div
                        className="
                            mt-6
                            rounded-2xl
                            border
                            border-emerald-400/20
                            bg-emerald-500/10
                            p-6
                            text-center
                        "
                    >
                        <div className="flex flex-col items-center text-center">
                            <FiCheckCircle
                                size={42}
                                className="mb-3 text-emerald-400"
                            />

                            <h2 className="text-2xl font-bold text-white">
                                Great job!
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                You matched all {totalPairs} pairs.
                            </p>
                        </div>

                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-3
                                gap-3
                            "
                        >
                            <ResultStat label="Score" value={score} />

                            <ResultStat label="Moves" value={moves} />

                            <ResultStat label="Best Combo" value={currentCombo} />
                        </div>

                        <button
                            onClick={restart}
                            className="
                                mt-4
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-white/10
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-white/15
                            "
                        >
                            <FiRotateCcw size={15} />
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ResultStat({ label, value }: { label: string; value: string | number }) {
    return (
        <div
            className="
                rounded-xl
                bg-white/5
                p-3
            "
        >
            <div
                className="
                    text-xs
                    text-slate-500
                "
            >
                {label}
            </div>

            <div
                className="
                    mt-1
                    text-lg
                    font-bold
                "
            >
                {value}
            </div>
        </div>
    );
}
