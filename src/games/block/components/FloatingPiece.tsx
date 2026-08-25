// FloatingPiece.tsx
import { useEffect, useState } from "react";
import type { Piece } from "../models/Piece";
import PieceView from "./PieceView";
import { CELL_GAP } from "../constants/constants";
import { DragPositionCalculator } from "../utils/DragPositionCalculator";

interface Props {
    piece: Piece;
    x: number;
    y: number;
    boardRef?: React.RefObject<HTMLDivElement>;
}

export default function FloatingPiece({ piece, x, y }: Props) {
    // Lấy kích thước thực tế của ô cờ từ DOM bàn cờ (mặc định fallback 48)
    const [cellSize, setCellSize] = useState(48);

    useEffect(() => {
        const boardEl = document.querySelector('[data-board="true"]') || document.querySelector(".board-grid");
        if (boardEl && boardEl.firstElementChild) {
            const width = (boardEl.firstElementChild as HTMLElement).getBoundingClientRect().width;
            if (width > 0) setCellSize(width);
        }
    }, []);

    const step = cellSize + CELL_GAP;
    const pointer = DragPositionCalculator.calculate(x, y);

    // Căn giữa tâm ngón tay vào TÂM của ô Anchor
    const anchorOffsetX = piece.anchor.col * step + cellSize / 2;
    const anchorOffsetY = piece.anchor.row * step + cellSize / 2;

    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{
                left: pointer.x - anchorOffsetX,
                top: pointer.y - anchorOffsetY,
            }}
        >
            <PieceView piece={piece} cellSize={cellSize} />
        </div>
    );
}
