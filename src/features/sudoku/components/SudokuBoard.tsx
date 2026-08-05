import type { Cell } from "../models/Cell";
import type { Position } from "../models/Position";
import { SudokuCell } from "./SudokuCell";

interface SudokuBoardProps {
    board: Cell[][];
    selectedCell: Position | null;
    onCellClick: (position: Position) => void;
}

export function SudokuBoard({
    board,
    selectedCell,
    onCellClick,
}: SudokuBoardProps) {
    return (
        <div className="border-2 border-gray-800">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <SudokuCell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell.value ?? 0}
                            fixed={cell.fixed}
                            row={rowIndex}
                            col={colIndex}
                            selected={
                                selectedCell?.row === rowIndex &&
                                selectedCell?.col === colIndex
                            }
                            onClick={() =>
                                onCellClick({
                                    row: rowIndex,
                                    col: colIndex,
                                })
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}