import { useState } from "react";

import type { StoryNode } from "../models/StoryNode";
import { getCharacter } from "../managers/CharacterManager";

interface StoryDialogProps {
    story: StoryNode;

    onComplete: () => void;
}

export function StoryDialog({ story, onComplete }: StoryDialogProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const line = story.lines[currentIndex];

    const isLastLine = currentIndex === story.lines.length - 1;

    const character = line.characterId ? getCharacter(line.characterId) : undefined;

    function handleNext() {
        if (isLastLine) {
            onComplete();
            return;
        }

        setCurrentIndex(currentIndex + 1);
    }

    if (!line) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                        {character?.avatar}
                    </div>

                    <div className="font-bold">{character?.name ?? "Unknown"}</div>
                </div>

                <p className="min-h-20 text-lg leading-relaxed text-gray-800">{line.text}</p>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={handleNext}
                        className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:scale-105"
                    >
                        {isLastLine ? "Continue" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}
