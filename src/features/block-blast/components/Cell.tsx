import {
    CELL_SIZE,
} from "../constants";

import type { Cell as CellModel } from "../models/Cell";

interface Props {
    cell: CellModel;
}

export default function Cell({ cell }: Props) {

    let background = "bg-slate-800";

    if (cell.occupied) {
        background = "bg-cyan-500";
    } else if (cell.preview) {
        background = cell.previewValid
            ? "bg-cyan-300"
            : "bg-red-400";
    }

    return (
        <div
            className={`
                rounded-md
                border
                border-slate-700
                ${background}
            `}
            style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
            }}
        />
    );

}