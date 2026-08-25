import { useState } from "react";

import type { StoryNode } from "../models/StoryNode";
import { getCharacter } from "../managers/CharacterManager";
import { StoryBackground } from "./StoryBackground";

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
        <div className="fixed inset-0 z-50 overflow-hidden">
            <StoryBackground mapId={story.mapId} />

            {/* Dark overlay */}

            <div
                className="
                    absolute
                    inset-0
                    bg-black/40
                    backdrop-blur-[2px]
                "
            />

            {/* Story dialog */}

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-full
                    items-end
                    justify-center
                    p-4
                "
            >
                <div
                    className="
                        w-full
                        max-w-2xl
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-slate-950/90
                        shadow-2xl
                        backdrop-blur-xl
                    "
                >
                    {isNarration ? (
                        <div className="px-6 pb-6 pt-7 sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/10" />

                                <span
                                    className="
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.25em]
                                        text-white/40
                                    "
                                >
                                    Narrator
                                </span>

                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            <p
                                className="
                                    mt-5
                                    min-h-20
                                    text-center
                                    text-lg
                                    leading-8
                                    text-white/70
                                "
                            >
                                {line.text}
                            </p>
                        </div>
                    ) : (
                        <div className="px-6 pb-6 pt-6 sm:px-8">
                            <div className="flex items-center gap-3">
                                {/* Character image */}

                                <div
                                    className="
                                        h-14
                                        w-14
                                        shrink-0
                                        overflow-hidden
                                        rounded-full
                                        bg-white/10
                                        ring-1
                                        ring-white/10
                                    "
                                >
                                    {character?.image ? (
                                        <img
                                            src={`${import.meta.env.BASE_URL}${character.image.replace(/^\/+/, "")}`}
                                            alt={character.name}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />
                                    ) : (
                                        <div
                                            className="
                                                flex
                                                h-full
                                                w-full
                                                items-center
                                                justify-center
                                                text-xl
                                                text-white/40
                                            "
                                        >
                                            ?
                                        </div>
                                    )}
                                </div>

                                {/* Character info */}

                                <div>
                                    <div className="font-bold text-white">{character?.name ?? "Unknown"}</div>

                                    <div className="text-xs text-white/30">speaking</div>
                                </div>
                            </div>

                            <p
                                className="
                                    mt-5
                                    min-h-20
                                    text-lg
                                    leading-8
                                    text-white/90
                                "
                            >
                                {line.text}
                            </p>
                        </div>
                    )}

                    {/* Action */}

                    <div
                        className="
                            flex
                            justify-end
                            border-t
                            border-white/5
                            bg-white/[0.03]
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
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-900
                                transition
                                hover:bg-white/90
                                active:scale-[0.98]
                            "
                        >
                            {isLastLine ? "Continue" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
