interface NumberPadProps {
    onNumberClick: (value: number) => void;
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function NumberPad({ onNumberClick }: NumberPadProps) {
    return (
        <div className="grid grid-cols-3 gap-2 justify-items-center">
            {NUMBERS.map((num) => (
                <button
                    key={num}
                    onClick={() => onNumberClick(num)}
                    className="
                        size-10
                        rounded-md
                        border
                        border-gray-300
                        bg-white
                        text-lg
                        font-semibold
                        shadow-sm
                        transition
                        hover:bg-gray-100
                        hover:shadow
                        active:scale-95
                    "
                >
                    {num}
                </button>
            ))}
        </div>
    );
}
