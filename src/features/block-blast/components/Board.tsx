import type { Board } from "../models/Board";
import Cell from "./Cell";

interface Props {
    board: Board;
}

export default function Board({ board }: Props) {
    return (
        <div
            className="grid gap-1 rounded-2xl bg-slate-800 p-3 shadow-xl"
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