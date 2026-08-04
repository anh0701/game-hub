import { Link } from "react-router-dom";

interface GameCardProps {
    title: string;
    description: string;
    path: string;
    available?: boolean;
}

export default function GameCard({ title, description, path, available = true }: GameCardProps) {
    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400">
            <h2 className="text-2xl font-bold">{title}</h2>

            <p className="mt-2 text-slate-400">{description}</p>

            <div className="mt-6">
                {available ? (
                    <Link
                        to={path}
                        className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-400"
                    >
                        Play
                    </Link>
                ) : (
                    <button disabled className="cursor-not-allowed rounded-lg bg-slate-700 px-4 py-2 text-slate-400">
                        Coming Soon
                    </button>
                )}
            </div>
        </div>
    );
}
