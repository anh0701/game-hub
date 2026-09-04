import type { VocabularyTopic, VocabularyWord } from "../models/WordCard";

import { VOCABULARY } from "../data/vocabulary";

export function getVocabularyByTopic(topic: VocabularyTopic): VocabularyWord[] {
    return VOCABULARY.filter((word) => word.topic === topic);
}

export function getRandomVocabulary(vocabulary: VocabularyWord[], pairCount: number): VocabularyWord[] {
    if (pairCount <= 0) {
        return [];
    }

    if (vocabulary.length < pairCount) {
        console.warn(`Not enough vocabulary. Requested ${pairCount}, but only ${vocabulary.length} available.`);
    }

    const shuffled = [...vocabulary];

    for (let index = shuffled.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled.slice(0, Math.min(pairCount, shuffled.length));
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
