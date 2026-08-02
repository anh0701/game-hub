import type { Cell as CellModel } from "../models/Cell";

interface Props {
    cell: CellModel;
}

export default function Cell({ cell }: Props) {
    return (
        <div
            className={`
                h-12
                w-12
                rounded-md
                border
                border-slate-700
                ${cell.occupied
                    ? "bg-cyan-500"
                    : "bg-slate-800"
                }
            `}
        />
    );
}