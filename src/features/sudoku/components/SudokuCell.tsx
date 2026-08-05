interface SudokuCellProps {
    value: number;
    fixed: boolean;
    onClick: () => void;
}

export function SudokuCell({ value, fixed, onClick }: SudokuCellProps) {
    return (
        <div
            onClick={onClick}
            className={`
                flex size-10 items-center justify-center
                border border-gray-300
                cursor-pointer select-none
                ${fixed ? "bg-gray-100 font-bold text-slate-800" : "bg-white text-blue-600"}
            `}
        >
            {value !== 0 ? value : ""}
        </div>
    );
}
