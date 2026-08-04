import type { PointerEvent } from "react";

import PieceSlot from "./PieceSlot";

import type { Piece } from "../models/Piece";

interface Props {
    pieces: Piece[];

    onDragStart: (piece: Piece, index: number, event: PointerEvent) => void;
}

export default function PieceTray({ pieces, onDragStart }: Props) {
    return (
        <div
            className="
                mt-10
                flex
                items-end
                gap-5
                rounded-3xl
                bg-slate-900/60
                p-5
            "
        >
            {pieces.map((piece, index) => (
                <PieceSlot key={piece.id} piece={piece} index={index} onDragStart={onDragStart} />
            ))}
        </div>
    );
}
