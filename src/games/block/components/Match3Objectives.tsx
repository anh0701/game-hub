import type { Match3Objective } from "../models/Match3Level";

interface ObjectiveProgress extends Match3Objective {
    current: number;
    completed: boolean;
}

interface Props {
    objectives: ObjectiveProgress[];
}

export default function Match3Objectives({ objectives }: Props) {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {objectives.map((objective, index) => {
                const label = objective.color ? `Clear ${objective.color} blocks` : "Clear blocks";

                return (
                    <div
                        key={index}
                        className={`
                                rounded-xl
                                border
                                px-3
                                py-2
                                text-sm
                                font-semibold
                                ${
                                    objective.completed
                                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                                        : "border-slate-700 bg-slate-800 text-slate-300"
                                }
                            `}
                    >
                        {label}

                        <span className="ml-2">
                            {objective.current}/{objective.target}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
