import { SudokuCell } from "./SudokuCell";

interface SudokuBoardProps {
    board: number[][];
}

export function SudokuBoard({ board }: SudokuBoardProps) {
    return (
        <div
            className="
            grid
            grid-cols-9
            border-2 border-gray-800
            "
        >
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <SudokuCell key={`${rowIndex}-${colIndex}`} value={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
}
