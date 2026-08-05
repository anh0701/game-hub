import type { Cell } from "../models/Cell";
import { SudokuCell } from "./SudokuCell";

interface SudokuBoardProps {
    board: Cell[][];
}

export function SudokuBoard({ board }: SudokuBoardProps) {
    return (
        <div className="border-2 border-gray-800">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <SudokuCell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell.value!}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
