interface Props {
    timeRemaining: number;
}

export default function Match3Timer({ timeRemaining }: Props) {
    const minutes = Math.floor(timeRemaining / 60);

    const seconds = timeRemaining % 60;

    return (
        <div
            className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-slate-800
                px-4
                py-2
                text-lg
                font-bold
                text-white
            "
        >
            <span>⏱</span>

            <span>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
        </div>
    );
}
