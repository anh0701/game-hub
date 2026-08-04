import type { Piece } from "../models/Piece";
import PieceView from "./PieceView";

import { CELL_GAP, getBoardCellSize } from "../constants";

interface Props {
    piece: Piece;
    x: number;
    y: number;
}

export default function FloatingPiece({ piece, x, y }: Props) {
    const cellSize = getBoardCellSize();

    const step = cellSize + CELL_GAP;

    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{
                left: x - piece.anchor.col * step,
                top: y - piece.anchor.row * step,
            }}
        >
            <PieceView piece={piece} cellSize={cellSize} />
        </div>
    );
}
