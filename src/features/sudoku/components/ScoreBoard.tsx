interface ScoreBoardProps {
    score: number;
}

export function ScoreBoard({ score }: ScoreBoardProps) {
    return (
        <div
            className="
            flex flex-col items-center
            gap-1
            "
        >
            <h2
                className="
                text-sm
                text-gray-500
                uppercase
                tracking-wider
                "
            >
                Score
            </h2>
            <p
                className="
                text-3xl
                font-bold
                "
            >
                {score}
            </p>
        </div>
    );
}
