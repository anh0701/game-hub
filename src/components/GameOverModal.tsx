interface GameOverModalProps {
    score: number;
    onRestart: () => void;
}

export function GameOverModal({ score, onRestart }: GameOverModalProps) {
    return (
        <div
            className="
                fixed
                inset-0
                z-[999]
                flex
                items-center
                justify-center
                bg-black/30
                px-4
            "
        >
            <div
                className="
                    w-full
                    max-w-sm
                    rounded-2xl
                    bg-white
                    px-7
                    py-7
                    shadow-2xl
                "
            >
                <h2
                    className="
                        text-center
                        text-2xl
                        font-bold
                        text-gray-800
                    "
                >
                    Game Over
                </h2>

                <p
                    className="
                        mb-6
                        mt-4
                        text-center
                        text-black
                    "
                >
                    Score: <span className="font-bold">{Math.floor(score)}</span>
                </p>

                <button
                    onClick={onRestart}
                    className="
                        w-full
                        rounded-lg
                        bg-blue-600
                        py-2.5
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        active:scale-[0.98]
                    "
                >
                    Play Again
                </button>
            </div>
        </div>
    );
}
