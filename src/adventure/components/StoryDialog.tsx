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

    if (!line) {
        return null;
    }

    const isLastLine = currentIndex === story.lines.length - 1;
    const isNarration = line.type === "narration";

    const character = line.characterId ? getCharacter(line.characterId) : undefined;

    function handleNext() {
        if (isLastLine) {
            onComplete();
            return;
        }

        setCurrentIndex((index) => index + 1);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4">
            <div
                className="
                    w-full
                    max-w-2xl
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-2xl
                "
            >
                {isNarration ? (
                    <div className="px-6 pb-6 pt-7 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />

                            <span
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.25em]
                                    text-gray-400
                                "
                            >
                                Narrator
                            </span>

                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <p
                            className="
                                mt-5
                                min-h-20
                                text-center
                                text-lg
                                leading-8
                                text-gray-600
                            "
                        >
                            {line.text}
                        </p>
                    </div>
                ) : (
                    <div className="px-6 pb-6 pt-6 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gray-100
                                    text-2xl
                                "
                            >
                                {character?.avatar ?? "?"}
                            </div>

                            <div>
                                <div className="font-bold text-gray-900">{character?.name ?? "Unknown"}</div>

                                <div className="text-xs text-gray-400">speaking</div>
                            </div>
                        </div>

                        <p
                            className="
                                mt-5
                                min-h-20
                                text-lg
                                leading-8
                                text-gray-800
                            "
                        >
                            {line.text}
                        </p>
                    </div>
                )}

                <div
                    className="
                        flex
                        items-center
                        justify-end
                        border-t
                        border-gray-100
                        bg-gray-50
                        px-6
                        py-4
                        sm:px-8
                    "
                >
                    <button
                        type="button"
                        onClick={handleNext}
                        className="
                            rounded-xl
                            bg-black
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-gray-800
                            active:scale-[0.98]
                        "
                    >
                        {isLastLine ? "Continue" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}
