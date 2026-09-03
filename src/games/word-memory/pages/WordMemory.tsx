import { useMemo, useState } from "react";

import { VOCABULARY } from "../data/vocabulary";

import { WordMemoryGame } from "../components/WordMemoryGame";

function shuffle<T>(items: T[]): T[] {
    const result = [...items];

    for (let index = result.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }

    return result;
}

export default function WordMemory() {
    const [gameKey, setGameKey] = useState(0);

    const vocabulary = useMemo(() => {
        return shuffle(VOCABULARY).slice(0, 4);
    }, [gameKey]);

    return (
        <WordMemoryGame
            key={gameKey}
            mode="free"
            vocabulary={vocabulary}
            memorizeTime={10}
            onComplete={() => {
                window.setTimeout(() => {
                    setGameKey((previous) => previous + 1);
                }, 1000);
            }}
        />
    );
}
