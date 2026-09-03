import type { VocabularyTopic } from "./WordCard";

export interface WordMemoryLevel {
    id: number;

    pairCount: number;

    memorizeTime: number;

    topic: VocabularyTopic;
}
