import { CELL_SIZE } from "../constants";
import type { Piece } from "../models/Piece";

export interface BoardPosition {
    row: number;
    col: number;
}

export class BoardPositionCalculator {

    static calculate(
        boardRect: DOMRect,
        mouseX: number,
        mouseY: number,
        piece: Piece
    ): BoardPosition {

        const localX =
            mouseX - boardRect.left;

        const localY =
            mouseY - boardRect.top;

        const anchorRow =
            Math.floor(
                localY / CELL_SIZE
            );

        const anchorCol =
            Math.floor(
                localX / CELL_SIZE
            );

        return {

            row:
                anchorRow -
                piece.anchor.row,

            col:
                anchorCol -
                piece.anchor.col,

        };

    }

}