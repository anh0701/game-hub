export type CardType = "word" | "meaning";

export type VocabularyTopic =
    | "basic"
    | "daily-life"
    | "people"
    | "food"
    | "home"
    | "work"
    | "travel"
    | "feelings"
    | "verbs"
    | "adjectives"
    | "conversation";

export interface VocabularyWord {
    id: string;

    word: string;

    meaning: string;

    topic: VocabularyTopic;
}

export interface WordCard {
    id: string;

    pairId: string;

    type: CardType;

    content: string;

    isFlipped: boolean;

    isMatched: boolean;
}
