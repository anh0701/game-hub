import type { PointerEvent } from "react";

import Piece from "./Piece";

import type { Piece as PieceModel } from "../models/Piece";

interface Props {
    piece: PieceModel;

    index: number;

    onDragStart: (
        piece: PieceModel,
        index: number,
        event: PointerEvent
    ) => void;
}

export default function PieceSlot({
    piece,
    index,
    onDragStart,
}: Props) {
    return (
        <div
            className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-700
                bg-slate-800/40
            "
        >
            <Piece
                piece={piece}
                index={index}
                onDragStart={onDragStart}
            />
        </div>
    );
}