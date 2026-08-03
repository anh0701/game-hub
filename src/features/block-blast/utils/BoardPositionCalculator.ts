import type { Piece } from "../models/Piece";

export interface BoardPosition {
    row: number;
    col: number;
}

export class BoardPositionCalculator {

    static calculate(
        boardElement: HTMLDivElement,
        mouseX: number,
        mouseY: number,
        piece: Piece
    ): BoardPosition {

        const rect = boardElement.getBoundingClientRect();

        const style = getComputedStyle(boardElement);

        const paddingLeft =
            parseFloat(style.paddingLeft);

        const paddingTop =
            parseFloat(style.paddingTop);

        const gap =
            parseFloat(style.gap);

        const firstCell =
            boardElement.firstElementChild as HTMLElement;

        const cellSize =
            firstCell.getBoundingClientRect().width;

        const step =
            cellSize + gap;

        const localX =
            mouseX -
            rect.left -
            paddingLeft;

        const localY =
            mouseY -
            rect.top -
            paddingTop;

        const anchorCol =
            Math.floor(localX / step);

        const anchorRow =
            Math.floor(localY / step);

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