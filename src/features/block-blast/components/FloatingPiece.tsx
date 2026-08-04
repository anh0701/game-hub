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

    const isMobile = window.innerWidth < 640;

    const offsetX = isMobile ? 10 : 0;
    const offsetY = isMobile ? 70 : 0;
    
    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{
                left: x - piece.anchor.col * step + offsetX,
                top: y - piece.anchor.row * step - offsetY,
            }}
        >
            <PieceView piece={piece} cellSize={cellSize} />
        </div>
    );
}
