import type { RefObject } from "react";

import Cell from "./Cell";

import type { Board as BoardModel } from "../models/Board";

import type { Match3Animation, Match3Position } from "../models/Match3Types";

interface Props {
    board: BoardModel;

    boardRef?: RefObject<HTMLDivElement | null>;

    selectedPosition: Match3Position | null;

    animation: Match3Animation;

    clearingPositions: Match3Position[];

    fallingPositions: Match3Position[];

    spawningPositions: Match3Position[];

    burstPositions: Match3Position[];

    onCellClick: (row: number, col: number) => void;
}

export default function Match3Board({
    board,
    boardRef,
    selectedPosition,
    animation,
    clearingPositions,
    fallingPositions,
    spawningPositions,
    burstPositions,
    onCellClick,
}: Props) {
    const isPosition = (positions: Match3Position[], row: number, col: number) =>
        positions.some((position) => position.row === row && position.col === col);

    return (
        <div
            ref={boardRef}
            data-board="true"
            className="
                relative
                grid
                w-full
                max-w-[520px]
                gap-1
                overflow-visible
                rounded-2xl
                bg-slate-800
                p-2
                shadow-xl
                sm:p-3
            "
            style={{
                gridTemplateColumns: `repeat(${board.cols}, minmax(0, 1fr))`,
            }}
        >
            {board.cells.map((rowCells, rowIndex) =>
                rowCells.map((cell, colIndex) => {
                    const selected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;

                    const clearing = isPosition(clearingPositions, rowIndex, colIndex);

                    const burst = isPosition(burstPositions, rowIndex, colIndex);

                    const falling = isPosition(fallingPositions, rowIndex, colIndex);

                    const spawning = isPosition(spawningPositions, rowIndex, colIndex);

                    return (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            type="button"
                            disabled={animation !== "idle"}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                            className={`
                                relative
                                aspect-square
                                w-full
                                min-w-0
                                rounded-md
                                p-0
                                outline-none

                                ${
                                    selected
                                        ? "z-10 scale-[0.92] ring-3 ring-white ring-offset-1 ring-offset-slate-800"
                                        : ""
                                }

                                ${clearing ? "animate-match-clear" : ""}

                                ${burst ? "animate-match-burst" : ""}

                                ${falling ? "animate-block-fall" : ""}

                                ${spawning ? "animate-block-spawn" : ""}
                            `}
                        >
                            <Cell cell={cell} />

                            {selected && (
                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        rounded-md
                                        border-2
                                        border-white
                                    "
                                />
                            )}
                        </button>
                    );
                })
            )}

            {/* Match explosion effects */}
            {burstPositions.map((position) => (
                <div
                    key={`burst-${position.row}-${position.col}`}
                    className="match3-burst-effect"
                    style={{
                        left: `calc(
                ${position.col} * (100% / ${board.cols}) +
                50% / ${board.cols}
            )`,
                        top: `calc(
                ${position.row} * (100% / ${board.cells.length}) +
                50% / ${board.cells.length}
            )`,
                    }}
                >
                    <span className="match3-explosion" />
                    <span className="match3-shockwave" />

                    <span className="match3-particle match3-particle-1" />
                    <span className="match3-particle match3-particle-2" />
                    <span className="match3-particle match3-particle-3" />
                    <span className="match3-particle match3-particle-4" />
                    <span className="match3-particle match3-particle-5" />
                    <span className="match3-particle match3-particle-6" />
                    <span className="match3-particle match3-particle-7" />
                    <span className="match3-particle match3-particle-8" />
                    <span className="match3-particle match3-particle-9" />
                    <span className="match3-particle match3-particle-10" />
                    <span className="match3-particle match3-particle-11" />
                    <span className="match3-particle match3-particle-12" />
                    <span className="match3-particle match3-particle-13" />
                    <span className="match3-particle match3-particle-14" />
                    <span className="match3-particle match3-particle-15" />
                    <span className="match3-particle match3-particle-16" />
                </div>
            ))}

            {/* Processing feedback */}
            {animation === "burst" && <div className="match3-processing" />}
        </div>
    );
}
