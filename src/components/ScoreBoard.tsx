export function ScoreBoard({ score }: { score: number }) {
    return (
        <div className="mb-2 flex flex-col items-center">
            <span className="text-xs tracking-widest">SCORE</span>

            <span className="text-3xl font-bold leading-none text-green-500">{score}</span>
        </div>
    );
}
