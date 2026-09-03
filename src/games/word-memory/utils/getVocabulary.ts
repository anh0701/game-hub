import type { VocabularyTopic, VocabularyWord } from "../models/WordCard";

import { VOCABULARY } from "../data/vocabulary";

export function getVocabularyByTopic(topic: VocabularyTopic): VocabularyWord[] {
    return VOCABULARY.filter((word) => word.topic === topic);
}

export function getRandomVocabulary(vocabulary: VocabularyWord[], pairCount: number): VocabularyWord[] {
    const shuffled = [...vocabulary];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled.slice(0, pairCount);
}

export function getRandomVocabularyByTopic(topic: VocabularyTopic, pairCount: number): VocabularyWord[] {
    const vocabulary = getVocabularyByTopic(topic);

    return getRandomVocabulary(vocabulary, pairCount);
}

export function shuffleVocabulary(vocabulary: VocabularyWord[]): VocabularyWord[] {
    const result = [...vocabulary];

    for (let index = result.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }

    return result;
}
