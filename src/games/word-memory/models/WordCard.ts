export type CardType = "word" | "meaning";

export interface VocabularyWord {
    id: string;

    word: string;

    meaning: string;
}

export interface WordCard {
    id: string;

    pairId: string;

    type: CardType;

    content: string;

    isFlipped: boolean;

    isMatched: boolean;
}
