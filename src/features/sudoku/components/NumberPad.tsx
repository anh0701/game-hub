interface NumberPadProps {
    onNumberClick: (value: number) => void;
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function NumberPad({ onNumberClick }: NumberPadProps) {
    return (
        <div
            className="
                grid grid-cols-3
                gap-2
                w-full max-w-56
                "
        >
            {NUMBERS.map((num) => (
                <button
                    key={num}
                    onClick={() => onNumberClick(num)}
                    className="
                        aspect-square
                        rounded-md
                        border
                        bg-white
                        text-lg font-semibold
                        hover:bg-gray-100
                        active:scale-95
                        transition
"
                >
                    {num}
                </button>
            ))}
        </div>
    );
}
