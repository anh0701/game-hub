import type { Cell as CellModel } from "../models/Cell";

interface Props {
    cell: CellModel;
}

const BLOCK_COLORS: Record<string, string> = {
    cyan: "#00d9ff",
    blue: "#5865f2",
    green: "#00d084",
    orange: "#ff9f1c",
    red: "#ff4d67",
    purple: "#b455ff",
};

export default function Cell({ cell }: Props) {
    if (cell.preview) {
        return (
            <div
                className={`
                    relative
                    aspect-square
                    w-full
                    overflow-hidden
                    rounded-md
                    border
                    ${cell.previewValid ? "border-cyan-300/40 bg-cyan-300/30" : "border-red-300/40 bg-red-400/30"}
                `}
            />
        );
    }

    if (!cell.occupied) {
        return (
            <div
                className="
                    aspect-square
                    w-full
                    rounded-md
                    border
                    border-slate-700
                    bg-slate-800/70
                "
            />
        );
    }

    const color = BLOCK_COLORS[cell.color ?? ""];

    return (
        <div
            className="
                block-cell
                relative
                aspect-square
                w-full
                overflow-hidden
                rounded-md
                border
                border-white/15
            "
            style={{
                background: `
                    linear-gradient(
                        145deg,
                        rgba(255,255,255,0.22) 0%,
                        transparent 28%
                    ),
                    linear-gradient(
                        160deg,
                        ${color} 0%,
                        ${color}dd 55%,
                        ${color}aa 100%
                    )
                `,
                boxShadow: `
                    inset 0 1px 1px rgba(255,255,255,0.4),
                    inset 0 -2px 4px rgba(0,0,0,0.18),
                    0 2px 5px ${color}55
                `,
            }}
        >
            <span className="block-shine" />
        </div>
    );
}
