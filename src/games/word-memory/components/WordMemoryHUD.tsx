import { FiAward, FiClock, FiTarget, FiX, FiZap } from "react-icons/fi";
import type { WordMemoryGamePhase } from "../models/WordMemoryGameState";

interface WordMemoryHUDProps {
    phase: WordMemoryGamePhase;
    levelId?: number;
    memorizeTimeRemaining: number;
    matchedPairs: number;
    totalPairs: number;
    moves: number;
    wrongMatches: number;
    currentCombo: number;
    score?: number;
    totalScore?: number;
}

export function WordMemoryHUD({
    phase,
    memorizeTimeRemaining,
    moves,
    wrongMatches,
    currentCombo,
    score,
    totalScore,
    levelId,
}: WordMemoryHUDProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                {levelId !== undefined && (
                    <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Level</div>

                        <div className="mt-1 text-2xl font-bold text-white">{levelId}</div>
                    </div>
                )}

                {phase === "memorizing" && (
                    <div
                        className="
                            flex items-center gap-3
                            rounded-xl
                            border border-indigo-400/30
                            bg-indigo-500/10
                            px-4 py-3
                        "
                    >
                        <FiClock className="text-indigo-400" size={22} />

                        <div>
                            <div
                                className="
                                    text-xs
                                    uppercase
                                    tracking-wider
                                    text-indigo-300
                                "
                            >
                                Memorize
                            </div>

                            <div className="text-xl font-bold text-white">{memorizeTimeRemaining}s</div>
                        </div>
                    </div>
                )}
            </div>

            {phase === "playing" && (
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-2
                        sm:grid-cols-4
                    "
                >
                    {/* Level mode */}
                    {score !== undefined && <Stat icon={<FiAward />} label="Score" value={score} />}

                    {/* Free mode */}
                    {totalScore !== undefined && <Stat icon={<FiAward />} label="Total Score" value={totalScore} />}

                    <Stat icon={<FiTarget />} label="Moves" value={moves} />

                    <Stat icon={<FiX />} label="Mistakes" value={wrongMatches} />

                    <Stat icon={<FiZap />} label="Combo" value={currentCombo > 0 ? `x${currentCombo}` : "-"} />
                </div>
            )}
        </div>
    );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div
            className="
                rounded-xl
                border border-white/10
                bg-white/5
                px-3 py-2
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    gap-1
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-slate-500
                "
            >
                {icon}
                {label}
            </div>

            <div
                className="
                    mt-1
                    text-center
                    text-sm
                    font-bold
                    text-white
                    sm:text-base
                "
            >
                {value}
            </div>
        </div>
    );
}
