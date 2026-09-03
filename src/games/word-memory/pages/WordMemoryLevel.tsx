import { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { WORD_MEMORY_LEVELS } from "../data/wordMemoryLevels";

import { WordMemoryGame } from "../components/WordMemoryGame";

import { getVocabularyByTopic, shuffleVocabulary } from "../utils/getVocabulary";

export default function WordMemoryLevelPage() {
    const navigate = useNavigate();

    const { levelId } = useParams();

    const currentLevelId = Number(levelId);

    const level = WORD_MEMORY_LEVELS.find((item) => item.id === currentLevelId);

    const vocabulary = useMemo(() => {
        if (!level) {
            return [];
        }

        const topicVocabulary = getVocabularyByTopic(level.topic);

        return shuffleVocabulary(topicVocabulary).slice(0, level.pairCount);
    }, [level]);

    if (!level) {
        return <div>Level not found</div>;
    }

    const nextLevel = WORD_MEMORY_LEVELS.find((item) => item.id === level.id + 1);

    const handleNextLevel = () => {
        if (!nextLevel) {
            return;
        }

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
