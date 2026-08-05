interface GameOverModalProps {
    score: number;
    onRestart: () => void;
}

interface GameOverModalProps {
    score: number;
    onRestart: () => void;
}

export function GameOverModal({ score, onRestart }: GameOverModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-80 rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-center text-2xl font-bold">Game Over</h2>

                <p className="mb-6 text-center">
                    Score: <span className="font-bold">{score}</span>
                </p>

                <button
                    onClick={onRestart}
                    className="
                        w-full
                        rounded-lg
                        bg-blue-600
                        py-2
                        font-semibold
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Play Again
                </button>
            </div>
        </div>
    );
}
