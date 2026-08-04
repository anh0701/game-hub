import type { PointerEvent } from "react";

import PieceView from "./PieceView";

import { TRAY_CELL_SIZE } from "../constants";

import type { Piece as PieceModel } from "../models/Piece";

interface Props {
    piece: PieceModel;
    index: number;

    onDragStart: (piece: PieceModel, index: number, event: PointerEvent<HTMLDivElement>) => void;
}

export default function Piece({ piece, index, onDragStart }: Props) {
    return (
        <div
            className="
                cursor-pointer
                transition-transform
                duration-150
                hover:scale-110
                active:scale-95
                select-none
                touch-none
            "
            onPointerDown={(event) => {
                console.log("pointer down");

                event.preventDefault();

                onDragStart(piece, index, event);
            }}
        >
            <PieceView piece={piece} cellSize={TRAY_CELL_SIZE} />
        </div>
    );
}
