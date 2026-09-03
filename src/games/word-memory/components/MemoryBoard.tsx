import type { WordCard } from "../models/WordCard";

import { MemoryCard } from "./MemoryCard";

interface MemoryBoardProps {
    cards: WordCard[];

    onCardClick: (cardId: string) => void;

    disabled?: boolean;
}

export function MemoryBoard({ cards, onCardClick, disabled = false }: MemoryBoardProps) {
    const pairCount = cards.length / 2;

    const gridClass =
        pairCount <= 4
            ? "grid-cols-2 sm:grid-cols-4"
            : pairCount <= 6
              ? "grid-cols-3 sm:grid-cols-4"
              : "grid-cols-4 sm:grid-cols-5";

    return (
        <div
            className={`
                grid
                ${gridClass}
                gap-3
                sm:gap-4
            `}
        >
            {cards.map((card) => (
                <MemoryCard key={card.id} card={card} disabled={disabled} onClick={() => onCardClick(card.id)} />
            ))}
        </div>
    );
}
