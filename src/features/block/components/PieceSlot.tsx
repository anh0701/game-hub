import type { PointerEvent } from "react";

import Piece from "./Piece";

import { TRAY_CELL_SIZE, CELL_GAP } from "../constants";

import type { Piece as PieceModel } from "../models/Piece";

interface Props {
    piece: PieceModel;

    index: number;

    onDragStart: (piece: PieceModel, index: number, event: PointerEvent) => void;
}

export default function PieceSlot({ piece, index, onDragStart }: Props) {
    const cols = Math.max(...piece.shape.map((row) => row.length));

    const rows = piece.shape.length;

    const width = cols * TRAY_CELL_SIZE + (cols - 1) * CELL_GAP + 32; // padding trái + phải

    const height = rows * TRAY_CELL_SIZE + (rows - 1) * CELL_GAP + 32;

    return (
        <div
            className="
                flex
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-700
                bg-slate-800/40
                transition-all
            "
            style={{
                width,
                height: Math.max(120, height),
            }}
        >
            <Piece piece={piece} index={index} onDragStart={onDragStart} />
        </div>
    );
}
