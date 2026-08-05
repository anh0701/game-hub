interface SudokuCellProps {
    value?: number;
}

export function SudokuCell({ value }: SudokuCellProps) {
    return (
        <div
            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                border
                border-gray-300
                text-lg
                font-semibold
            "
        >
            {value !== 0 ? value : ""}
        </div>
    );
}
