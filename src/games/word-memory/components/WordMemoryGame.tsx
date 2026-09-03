import { FiCheckCircle, FiRotateCcw, FiZap } from "react-icons/fi";

import type { VocabularyWord } from "../models/WordCard";

import { useWordMemory } from "../hooks/useWordMemory";

import { MemoryBoard } from "./MemoryBoard";

import { WordMemoryHUD } from "./WordMemoryHUD";

interface WordMemoryGameProps {
    mode?: "free" | "level";

    vocabulary: VocabularyWord[];

    memorizeTime?: number;
    levelId?: number;

    onComplete?: () => void;

    onNextLevel?: () => void;
}

export function WordMemoryGame({
    mode = "free",

    vocabulary,

    memorizeTime = 10,

    levelId,

    onComplete,
    onNextLevel,
}: WordMemoryGameProps) {
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
                    levelId={levelId}
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
                    <div className="mt-6 text-center">
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
                                inline-flex
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

                {phase === "completed" && mode === "level" && (
                    <div
                        className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/70
                        px-4
                        backdrop-blur-sm
                    "
                    >
                        <div
                            className="
                            w-full
                            max-w-md
                            rounded-3xl
                            border
                            border-white/10
                            bg-slate-900
                            p-6
                            text-center
                            shadow-2xl
                        "
                        >
                            <FiCheckCircle
                                size={48}
                                className="
                                mx-auto
                                mb-4
                                text-emerald-400
                            "
                            />

                            <div
                                className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-emerald-400
                            "
                            >
                                Level {levelId} Complete
                            </div>

                            <h2
                                className="
                                mt-2
                                text-3xl
                                font-bold
                                text-white
                            "
                            >
                                Great job!
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">You matched all {totalPairs} pairs.</p>

                            <div
                                className="
                                mt-6
                                grid
                                grid-cols-3
                                gap-3
                            "
                            >
                                <ResultStat label="Score" value={score} />

                                <ResultStat label="Moves" value={moves} />

                                <ResultStat label="Best Combo" value={currentCombo} />
                            </div>

                            <div
                                className="
                                mt-6
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:justify-center
                            "
                            >
                                <button
                                    type="button"
                                    onClick={restart}
                                    className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-white/10
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-white/15
                                "
                                >
                                    <FiRotateCcw size={16} />
                                    Play Again
                                </button>

                                {onNextLevel && (
                                    <button
                                        type="button"
                                        onClick={onNextLevel}
                                        className="
                                        rounded-xl
                                        bg-indigo-500
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-indigo-400
                                    "
                                    >
                                        Next Level
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ResultStat({
    label,
    value,
}: {
    label: string;

    value: string | number;
}) {
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
