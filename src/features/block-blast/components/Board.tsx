import type { Board } from "../models/Board";
import Cell from "./Cell";

interface Props {
    board: Board;
}

export default function Board({ board }: Props) {
    return (
        <div
            className="grid gap-1 rounded-xl bg-slate-900 p-2"
            style={{
                gridTemplateColumns: `repeat(${board.cols}, 1fr)`,
            }}
        >
            {board.cells.flat().map((cell, index) => (
                <Cell
                    key={index}
                    cell={cell}
                />
            ))}
        </div>
    );
}