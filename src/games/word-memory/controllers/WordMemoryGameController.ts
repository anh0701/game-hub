import type { VocabularyWord, WordCard } from "../models/WordCard";
import type { WordMemoryGamePhase, WordMemoryGameState } from "../models/WordMemoryGameState";

export class WordMemoryGameController {
    private cards: WordCard[] = [];

    private phase: WordMemoryGamePhase = "memorizing";

    private selectedCardIds: string[] = [];

    private matchedPairs = 0;

    private moves = 0;

    private wrongMatches = 0;

    private currentCombo = 0;

    private bestCombo = 0;

    private score = 0;

    constructor(vocabulary: VocabularyWord[]) {
        this.cards = this.createCards(vocabulary);
    }


    private createCards(vocabulary: VocabularyWord[]): WordCard[] {
        const cards: WordCard[] = [];

        vocabulary.forEach((item) => {
            cards.push({
                id: `${item.id}-word`,

                pairId: item.id,

                type: "word",

                content: item.word,

                isFlipped: true,

                isMatched: false,
            });

            cards.push({
                id: `${item.id}-meaning`,

                pairId: item.id,

                type: "meaning",

                content: item.meaning,

                isFlipped: true,

                isMatched: false,
            });
        });

        return this.shuffle(cards);
    }

    
    private shuffle(cards: WordCard[]): WordCard[] {
        const shuffled = [...cards];

        for (let index = shuffled.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));

            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }

        return shuffled;
    }

    public startPlaying(): void {
        if (this.phase !== "memorizing") {
            return;
        }

        this.phase = "playing";

        this.cards = this.cards.map((card) => ({
            ...card,

            isFlipped: false,
        }));
    }


    public selectCard(cardId: string): boolean {
        if (this.phase !== "playing") {
            return false;
        }

        const card = this.cards.find((item) => item.id === cardId);

        if (!card) {
            return false;
        }

        if (card.isMatched) {
            return false;
        }

        if (card.isFlipped) {
            return false;
        }

        if (this.selectedCardIds.length >= 2) {
            return false;
        }

        this.cards = this.cards.map((item) =>
            item.id === cardId
                ? {
                      ...item,

                      isFlipped: true,
                  }
                : item
        );

        this.selectedCardIds.push(cardId);

        return true;
    }


    public getSelectedCards(): WordCard[] {
        return this.cards.filter((card) => this.selectedCardIds.includes(card.id));
    }


    public checkMatch(): boolean | null {
        if (this.selectedCardIds.length !== 2) {
            return null;
        }

        const selectedCards = this.getSelectedCards();

        const [firstCard, secondCard] = selectedCards;

        this.moves++;

        const isMatch = firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type;

        if (isMatch) {
            this.handleCorrectMatch();
        } else {
            this.handleWrongMatch();
        }

        this.selectedCardIds = [];

        if (this.matchedPairs === this.cards.length / 2) {
            this.phase = "completed";
        }

        return isMatch;
    }

    private handleCorrectMatch(): void {
        this.currentCombo++;

        if (this.currentCombo > this.bestCombo) {
            this.bestCombo = this.currentCombo;
        }

        const baseScore = 100;

        const comboBonus = (this.currentCombo - 1) * 50;

        this.score += baseScore + comboBonus;

        this.cards = this.cards.map((card) =>
            this.selectedCardIds.includes(card.id)
                ? {
                      ...card,

                      isMatched: true,
                  }
                : card
        );

        this.matchedPairs++;
    }

    private handleWrongMatch(): void {
        this.wrongMatches++;

        this.currentCombo = 0;

        this.cards = this.cards.map((card) =>
            this.selectedCardIds.includes(card.id)
                ? {
                      ...card,

                      isFlipped: false,
                  }
                : card
        );
    }

    /**
     * Get complete game state
     */
    public getState(): WordMemoryGameState {
        return {
            cards: this.getCards(),

            phase: this.phase,

            matchedPairs: this.matchedPairs,

            totalPairs: this.cards.length / 2,

            moves: this.moves,

            wrongMatches: this.wrongMatches,

            currentCombo: this.currentCombo,

            bestCombo: this.bestCombo,

            score: this.score,
        };
    }

    public getCards(): WordCard[] {
        return [...this.cards];
    }

    public getPhase(): WordMemoryGamePhase {
        return this.phase;
    }

    public getMatchedPairs(): number {
        return this.matchedPairs;
    }
}
