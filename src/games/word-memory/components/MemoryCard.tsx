import { FiCheck, FiHelpCircle } from "react-icons/fi";

import type { WordCard } from "../models/WordCard";

interface MemoryCardProps {
    card: WordCard;

    onClick: () => void;

    disabled?: boolean;
}

export function MemoryCard({
    card,
    onClick,
    disabled = false,
}: MemoryCardProps) {
    const isVisible = card.isFlipped || card.isMatched;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || card.isMatched}
            className="
                relative
                aspect-[4/5]
                w-full
                cursor-pointer
                [perspective:1000px]
                disabled:cursor-default
            "
        >

            <div
                className="
                    relative
                    h-full
                    w-full
                    transition-transform
                    duration-500
                    [transform-style:preserve-3d]
                "
                style={{
                    transform: isVisible
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                }}
            >
                {/* back */}

                <div
                    className={`
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-gradient-to-br
                        from-indigo-500
                        to-purple-600
                        shadow-lg
                        transition-opacity
                        duration-150
                        ${
                            isVisible
                                ? "pointer-events-none opacity-0"
                                : "opacity-100"
                        }
                    `}
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div
                        className="
                            absolute
                            inset-2
                            rounded-xl
                            border
                            border-white/20
                        "
                    />

                    <FiHelpCircle
                        size={38}
                        className="text-white/90"
                    />
                </div>

                {/* front  */}

                <div
                    className={`
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border
                        p-4
                        text-center
                        shadow-lg
                        transition-opacity
                        duration-150
                        ${
                            isVisible
                                ? "opacity-100"
                                : "pointer-events-none opacity-0"
                        }

                        ${
                            card.isMatched
                                ? `
                                    border-emerald-400/40
                                    bg-emerald-500/10
                                `
                                : card.type === "word"
                                  ? `
                                        border-blue-400/30
                                        bg-slate-800
                                    `
                                  : `
                                        border-amber-400/30
                                        bg-slate-800
                                    `
                        }
                    `}
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div className="flex flex-col items-center">
                       
                        <div
                            className="
                                mb-3
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-400
                            "
                        >
                            {card.type}
                        </div>

                        <div
                            className="
                                text-lg
                                font-bold
                                leading-tight
                                text-white
                            "
                        >
                            {card.content}
                        </div>

                        {card.isMatched && (
                            <div
                                className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-bold
                                    text-emerald-400
                                "
                            >
                                <FiCheck size={14} />

                                MATCHED
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}