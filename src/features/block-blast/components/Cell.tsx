import {
    BOARD_CELL_SIZE,
} from "../constants";

import type { Cell as CellModel } from "../models/Cell";

interface Props {
    cell: CellModel;
}

export default function Cell({ cell }: Props) {

    let backgroundColor = "#1e293b"; // slate-800

    if (cell.occupied) {
        backgroundColor = cell.color ?? "#06b6d4";
    } else if (cell.preview) {
        backgroundColor = cell.previewValid
            ? "#67e8f9"
            : "#f87171";
    }

    return (
        <div
            className="
                rounded-md
                border
                border-slate-700
            "
            style={{
                width: BOARD_CELL_SIZE,
                height: BOARD_CELL_SIZE,
                backgroundColor,
            }}
        />
    );
}