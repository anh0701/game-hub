import type { Cell as CellModel } from "../models/Cell";

interface Props {
    cell: CellModel;
}

const BLOCK_COLORS: Record<string, string> = {
    cyan: "#18C9E8",
    blue: "#4F6BFF",
    green: "#18B96E",
    yellow: "#FFD21F",
    orange: "#FF7A18",
    red: "#FF4B5F",
    purple: "#A855F7",
};

export default function Cell({ cell }: Props) {
    if (cell.preview) {
        return (
            <div
                className={`
                    touch-none
                    select-none
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

    const color = BLOCK_COLORS[cell.color ?? ""] ?? "#ffffff";

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
                    rgba(255,255,255,0.18) 0%,
                    transparent 30%
                ),
                ${color}
            `,
            boxShadow: `
                inset 0 1px 1px rgba(255,255,255,0.35),
                inset 0 -2px 4px rgba(0,0,0,0.2),
                0 2px 5px ${color}66
            `,
        }}
    >
        <span className="block-shine" />
    </div>
);
}
