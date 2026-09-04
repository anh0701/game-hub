import type { WordCard } from "./WordCard";

export type WordMemoryGamePhase = "memorizing" | "playing" | "completed" | "game-completed";

export interface WordMemoryGameState {
    cards: WordCard[];

    phase: WordMemoryGamePhase;

    matchedPairs: number;

    totalPairs: number;

    moves: number;

    wrongMatches: number;

    currentCombo: number;

    bestCombo: number;

    score: number;
}
