import { getDragOffset } from "../constants/constants";

export interface DragPosition {
    x: number;
    y: number;
}

export class DragPositionCalculator {
    static calculate(pointerX: number, pointerY: number): DragPosition {
        const { x, y } = getDragOffset();

        return {
            x: pointerX + x,
            y: pointerY - y,
        };
    }
}
