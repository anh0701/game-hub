import type { Piece } from "../models/Piece";

import { CELL_GAP } from "../constants";

interface Props {
    piece: Piece;
    cellSize: number;
}

export default function PieceView({ piece, cellSize }: Props) {
    return (
        <div
            className="inline-grid"
            style={{
                gap: CELL_GAP,
            }}
        >
            {piece.shape.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: "flex",
                        gap: CELL_GAP,
                    }}
                >
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                                width: cellSize,
                                height: cellSize,
                                borderRadius: 8,
                                background: cell ? piece.color : "transparent",
                                opacity: cell ? 1 : 0,
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
