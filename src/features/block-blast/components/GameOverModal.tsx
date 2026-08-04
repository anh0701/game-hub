interface Props {
    score: number;

    onRestart: () => void;
}

export default function GameOverModal({ score, onRestart }: Props) {
    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
                backdrop-blur-sm
            "
        >
            <div
                className="
                    w-[90%]
                    max-w-sm
                    rounded-2xl
                    bg-slate-800
                    p-8
                    text-center
                    shadow-2xl
                "
            >
                <h1
                    className="
                        text-4xl
                        font-bold
                        text-white
                    "
                >
                    Game Over
                </h1>

                <p
                    className="
                        mt-5
                        text-lg
                        text-slate-300
                    "
                >
                    Final Score
                </p>

                <p
                    className="
                        mt-2
                        text-5xl
                        font-bold
                        text-cyan-400
                    "
                >
                    {score}
                </p>

                <button
                    onClick={onRestart}
                    className="
                        mt-8
                        w-full
                        rounded-xl
                        bg-cyan-500
                        py-3
                        text-lg
                        font-semibold
                        text-white
                        transition
                        hover:bg-cyan-600
                    "
                >
                    Play Again
                </button>
            </div>
        </div>
    );
}
