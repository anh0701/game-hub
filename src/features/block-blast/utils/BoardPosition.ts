import {
    BOARD_PADDING,
    CELL_TOTAL_SIZE,
} from "../constants";

export interface BoardPosition {

    row: number;

    col: number;

}

export function getBoardPosition(
    rect: DOMRect,
    clientX: number,
    clientY: number
): BoardPosition {

    const x =
        clientX -
        rect.left -
        BOARD_PADDING;

    const y =
        clientY -
        rect.top -
        BOARD_PADDING;

    return {

        row: Math.floor(
            y / CELL_TOTAL_SIZE
        ),

        col: Math.floor(
            x / CELL_TOTAL_SIZE
        ),

    };

}