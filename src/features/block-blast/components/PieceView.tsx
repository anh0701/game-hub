import type { Piece } from "../models/Piece";

interface Props {
    piece: Piece;
}

export default function PieceView({ piece }: Props) {
    return (
        <div className="inline-grid gap-1">
            {piece.shape.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex gap-1"
                >
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`
                                h-8
                                w-8
                                rounded-md
                                ${
                                    cell
                                        ? "bg-cyan-400"
                                        : "opacity-0"
                                }
                            `}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}