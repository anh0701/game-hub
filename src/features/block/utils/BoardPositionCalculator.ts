import type { Piece } from "../models/Piece";
import { DragPositionCalculator } from "./DragPositionCalculator";

export interface BoardPosition {
    row: number;
    col: number;
}

export class BoardPositionCalculator {
    static calculate(boardElement: HTMLDivElement, pointerX: number, pointerY: number, piece: Piece): BoardPosition {
        const rect = boardElement.getBoundingClientRect();
        const style = getComputedStyle(boardElement);

        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const paddingTop = parseFloat(style.paddingTop) || 0;
        const gap = parseFloat(style.gap) || 0;

        const firstCell = boardElement.firstElementChild as HTMLElement;
        const cellSize = firstCell ? firstCell.getBoundingClientRect().width : 48;
        const step = cellSize + gap;

        // Vị trí con trỏ sau khi cộng Mobile Drag Offset
        const pointer = DragPositionCalculator.calculate(pointerX, pointerY);

        // Đưa tọa độ về góc lọt lòng của Bàn cờ
        const localX = pointer.x - rect.left - paddingLeft;
        const localY = pointer.y - rect.top - paddingTop;

        // Tọa độ cột/hàng của Ô CỜ mà ngón tay (Anchor) đang trỏ tới
        const anchorCol = Math.floor(localX / step);
        const anchorRow = Math.floor(localY / step);

        // Quy về startRow, startCol (góc top-left của mảnh gạch)
        return {
            row: anchorRow - piece.anchor.row,
            col: anchorCol - piece.anchor.col,
        };
    }
}
