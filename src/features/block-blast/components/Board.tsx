import type { RefObject } from "react";

import Cell from "./Cell";

import type { Board as BoardModel } from "../models/Board";

interface Props {
    board: BoardModel;

    boardRef: RefObject<HTMLDivElement | null>;
}

export default function Board({ board, boardRef }: Props) {
    return (
        <div
            ref={boardRef}
            className="grid gap-1 rounded-2xl bg-slate-800 p-3 shadow-xl"
            style={{
                gridTemplateColumns: `repeat(${board.cols}, auto)`,
            }}
        >
            {board.cells.flat().map((cell, index) => (
                <Cell key={index} cell={cell} />
            ))}
        </div>
    );
}
