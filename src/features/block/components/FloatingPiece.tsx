import type { Piece } from "../models/Piece";
import PieceView from "./PieceView";

import { CELL_GAP, getBoardCellSize } from "../constants/constants";
import { DragPositionCalculator } from "../utils/DragPositionCalculator";

interface Props {
    piece: Piece;
    x: number;
    y: number;
}

export default function FloatingPiece({ piece, x, y }: Props) {
    const cellSize = getBoardCellSize();

    const step = cellSize + CELL_GAP;

    const pointer = DragPositionCalculator.calculate(x, y);
    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{
                left: pointer.x - piece.anchor.col * step,
                top: pointer.y - piece.anchor.row * step,
            }}
        >
            <PieceView piece={piece} cellSize={cellSize} />
        </div>
    );
}
