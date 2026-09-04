import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiLock } from "react-icons/fi";

import { WORD_MEMORY_LEVELS } from "../data/wordMemoryLevels";
import { WordMemoryGame } from "../components/WordMemoryGame";
import { getVocabularyByTopic, shuffleVocabulary } from "../utils/getVocabulary";

export default function WordMemoryLevelPage() {
    const navigate = useNavigate();
    const { levelId } = useParams();

    const currentLevelId = Number(levelId);

    const currentLevelIndex = WORD_MEMORY_LEVELS.findIndex((item) => item.id === currentLevelId);

    const level = WORD_MEMORY_LEVELS[currentLevelIndex];

    const nextLevel = currentLevelIndex >= 0 ? WORD_MEMORY_LEVELS[currentLevelIndex + 1] : undefined;

    const topicVocabulary = useMemo(() => {
        if (!level) return [];

        return getVocabularyByTopic(level.topic);
    }, [level]);

    const vocabulary = useMemo(() => {
        if (!level) return [];

        return shuffleVocabulary(topicVocabulary).slice(0, level.pairCount);
    }, [level, topicVocabulary]);

    if (!level) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-slate-950 px-4 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Level not found</h1>

                    <button
                        type="button"
                        onClick={() => navigate("/word-memory")}
                        className="mt-4 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    // Level đã tồn tại nhưng chưa có vocabulary
    if (topicVocabulary.length === 0) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-slate-950 px-4 text-white">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center shadow-2xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
                        <FiLock size={28} className="text-indigo-400" />
                    </div>

                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                        Level {level.id}
                    </div>

                    <h1 className="mt-2 text-3xl font-bold">Coming Soon</h1>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        This level is not available yet.
                        <br />
                        New vocabulary is coming soon!
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/word-memory")}
                        className="mt-6 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/15"
                    >
                        Back to Word Memory
                    </button>
                </div>
            </div>
        );
    }

    const handleNextLevel = () => {
        if (!nextLevel) return;

        navigate(`/word-memory/level/${nextLevel.id}`);
    };

    return (
        <WordMemoryGame
            key={level.id}
            mode="level"
            levelId={level.id}
            vocabulary={vocabulary}
            memorizeTime={level.memorizeTime}
            onComplete={() => {
                console.log("Level completed:", level.id);
            }}
            onNextLevel={nextLevel ? handleNextLevel : undefined}
        />
    );
}
