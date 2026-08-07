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
                mt-6
                flex
                flex-wrap
                justify-center
                items-end
                gap-3
                rounded-3xl
                bg-slate-900/60
                p-3

                sm:mt-8
                sm:gap-5
                sm:p-5
            "
        >
            {pieces.map((piece, index) => (
                <PieceSlot key={piece.id} piece={piece} index={index} onDragStart={onDragStart} />
            ))}
        </div>
    );
}
