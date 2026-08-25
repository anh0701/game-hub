import type { Piece } from "./Piece";

export interface DragState {
    dragging: boolean;

    pieceIndex: number | null;

    piece: Piece | null;

    boardRow: number | null;

    boardCol: number | null;
}
