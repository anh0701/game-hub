import type { VocabularyTopic } from "./WordCard";

export interface MemoryTopic {
    id: VocabularyTopic;

    title: string;

    description: string;

    icon: string;
}
