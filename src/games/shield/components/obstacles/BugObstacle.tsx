interface BugObstacleProps {
    size?: number;
    color?: string;
}

function BugObstacle({ size = 70, color = "#ef4444" }: BugObstacleProps) {
    return (
        <div
            className="relative"
            style={{
                width: size,
                height: size,
            }}
        >
            {/* Legs */}
            <div className="absolute left-[5%] top-[32%] h-1 w-[30%] -rotate-20 rounded-full bg-black/40" />

            <div className="absolute left-[2%] top-[55%] h-1 w-[32%] -rotate-8 rounded-full bg-black/40" />

            <div className="absolute left-[5%] top-[72%] h-1 w-[30%] rotate-20 rounded-full bg-black/40" />

            <div className="absolute right-[5%] top-[32%] h-1 w-[30%] rotate-20 rounded-full bg-black/40" />

            <div className="absolute right-[2%] top-[55%] h-1 w-[32%] rotate-8 rounded-full bg-black/40" />

            <div className="absolute right-[5%] top-[72%] h-1 w-[30%] -rotate-20 rounded-full bg-black/40" />

            {/* Body */}
            <div
                className="absolute left-1/2 top-[25%] h-[65%] w-[52%] -translate-x-1/2 rounded-[45%] border-4 border-black/25 shadow-lg"
                style={{
                    backgroundColor: color,
                }}
            >
                {/* Head */}
                <div
                    className="absolute -top-[20%] left-1/2 h-[42%] w-[85%] -translate-x-1/2 rounded-full"
                    style={{
                        backgroundColor: color,
                    }}
                />

                {/* Eyes */}
                <div className="absolute left-[17%] top-[-8%] h-3 w-3 rounded-full bg-white">
                    <div className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-black" />
                </div>

                <div className="absolute right-[17%] top-[-8%] h-3 w-3 rounded-full bg-white">
                    <div className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-black" />
                </div>

                {/* Highlight */}
                <div className="absolute left-[20%] top-[20%] h-3 w-2 rounded-full bg-white/40" />
            </div>

            {/* Antenna */}
            <div className="absolute left-[30%] top-[4%] h-4 w-1 -rotate-20 rounded-full bg-black/40" />

            <div className="absolute right-[30%] top-[4%] h-4 w-1 rotate-20 rounded-full bg-black/40" />

            <div className="absolute left-[27%] top-0 h-2 w-2 rounded-full bg-black/40" />

            <div className="absolute right-[27%] top-0 h-2 w-2 rounded-full bg-black/40" />
        </div>
    );
}

export default BugObstacle;
