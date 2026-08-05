interface SudokuCellProps {
    value: number;
    fixed: boolean;

    row: number;
    col: number;

    selected: boolean;
    onClick: () => void;
}

export function SudokuCell({
    value,
    fixed,
    row,
    col,
    selected,
    onClick,
}: SudokuCellProps) {

    const rightBorder = col % 3 === 2 && col !== 8;
    const bottomBorder = row % 3 === 2 && row !== 8;

    return (
        <div
            onClick={onClick}
            className={`
                flex
                size-10
                items-center
                justify-center
                cursor-pointer
                select-none

                border
                border-gray-300

                ${rightBorder ? "border-r-2 border-r-slate-800" : ""}
                ${bottomBorder ? "border-b-2 border-b-slate-800" : ""}

                ${
                    selected
                        ? "bg-blue-200"
                        : fixed
                            ? "bg-gray-100"
                            : "bg-white"
                }

                ${
                    fixed
                        ? "font-bold text-slate-800"
                        : "text-blue-600"
                }
            `}
        >
            {value === 0 ? "" : value}
        </div>
    );
}