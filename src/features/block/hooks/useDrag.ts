import { useState } from "react";

import type { Piece } from "../models/Piece";

interface DragState {
    dragging: boolean;
    piece: Piece | null;
    pieceIndex: number | null;

    x: number;
    y: number;
}

export function useDrag() {
    const [state, setState] = useState<DragState>({
        dragging: false,
        piece: null,
        pieceIndex: null,

        x: 0,
        y: 0,
    });

    function start(piece: Piece, pieceIndex: number, x: number, y: number) {
        setState({
            dragging: true,
            piece,
            pieceIndex,
            x,
            y,
        });
    }

    function move(x: number, y: number) {
        setState((prev) => ({
            ...prev,
            x,
            y,
        }));
    }

    function end() {
        setState({
            dragging: false,
            piece: null,
            pieceIndex: null,
            x: 0,
            y: 0,
        });
    }

    return {
        state,
        start,
        move,
        end,
    };
}
