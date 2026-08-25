import type { Mission } from "../models/Mission";

interface MissionCardProps {
    mission: Mission;

    onStart: () => void;
}

export function MissionCard({ mission, onStart }: MissionCardProps) {
    return (
        <div className="mx-auto w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {mission.difficulty}
            </div>

            <h1 className="text-3xl font-bold">{mission.title}</h1>

            <p className="mt-3 text-gray-600">{mission.description}</p>

            <button
                type="button"
                onClick={onStart}
                className="mt-8 w-full rounded-2xl bg-black px-6 py-4 font-bold text-white transition hover:scale-[1.02]"
            >
                Start Mission
            </button>
        </div>
    );
}
