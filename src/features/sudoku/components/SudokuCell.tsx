interface SudokuCellProps {
    value?: number;
}

export function SudokuCell({ value }: SudokuCellProps) {
    return (
        <div
            className="
            flex items-center justify-center
            size-12 md:size-14 lg:size-16
            border border-gray-300
            bg-white
            text-lg md:text-xl font-semibold
            select-none
            "
        >
            {value}
        </div>
    );
}
