import type { Obstacle as ObstacleModel } from "../models/Obstacle";

interface ObstacleProps {
    obstacle: ObstacleModel;
    cameraY: number;
}

const BASE_SIZE = 70;

const BUG_COLORS = {
    dark: {
        body: "bg-dark-500",
        dark: "bg-dark-700",
    },
    red: {
        body: "bg-red-500",
        dark: "bg-red-700",
    },
    blue: {
        body: "bg-blue-500",
        dark: "bg-blue-700",
    },
    green: {
        body: "bg-green-500",
        dark: "bg-green-700",
    },
    yellow: {
        body: "bg-yellow-400",
        dark: "bg-yellow-600",
    },
    purple: {
        body: "bg-purple-500",
        dark: "bg-purple-700",
    },
    orange: {
        body: "bg-orange-500",
        dark: "bg-orange-700",
    },
    pink: {
        body: "bg-pink-500",
        dark: "bg-pink-700",
    },
};

function Obstacle({ obstacle, cameraY }: ObstacleProps) {
    const screenY = obstacle.y + cameraY;

    const diameter = obstacle.radius * 2;
    const scale = diameter / BASE_SIZE;

    const color = BUG_COLORS[obstacle.color]  ?? BUG_COLORS.red;

    return (
        <div
            className="pointer-events-none absolute"
            style={{
                left: obstacle.x,
                top: screenY,
                width: BASE_SIZE,
                height: BASE_SIZE,
                transform: `
                    translate(-50%, -50%)
                    rotate(${obstacle.rotation}deg)
                    scale(${scale})
                `,
            }}
        >
            {/* Legs */}
            <div
                className={`absolute left-1/2 top-[25%] h-1 w-[85%] -translate-x-1/2 -rotate-12 rounded-full ${color.dark}`}
            />

            <div
                className={`absolute left-1/2 top-[45%] h-1 w-[90%] -translate-x-1/2 rotate-12 rounded-full ${color.dark}`}
            />

            <div
                className={`absolute left-1/2 top-[65%] h-1 w-[85%] -translate-x-1/2 -rotate-12 rounded-full ${color.dark}`}
            />

            {/* Body */}
            <div
                className={`
                    absolute left-1/2 top-1/2
                    h-[72%] w-[58%]
                    -translate-x-1/2 -translate-y-1/2
                    rounded-[45%]
                    border-4 border-black/30
                    ${color.body}
                    shadow-lg
                `}
            >
                {/* Head */}
                <div
                    className={`
                        absolute -top-[18%] left-1/2
                        h-[42%] w-[85%]
                        -translate-x-1/2
                        rounded-full
                        ${color.dark}
                    `}
                />

                {/* Left eye */}
                <div className="absolute left-[20%] top-[2%] h-3 w-3 rounded-full bg-white">
                    <div className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-black" />
                </div>

                {/* Right eye */}
                <div className="absolute right-[20%] top-[2%] h-3 w-3 rounded-full bg-white">
                    <div className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-black" />
                </div>

                {/* Body shine */}
                <div className="absolute left-[20%] top-[25%] h-3 w-2 rounded-full bg-white/40" />
            </div>

            {/* Antenna */}
            <div className="absolute left-[28%] top-[2%] h-4 w-1 -rotate-20 rounded-full bg-black/50" />
            <div className="absolute right-[28%] top-[2%] h-4 w-1 rotate-20 rounded-full bg-black/50" />

            <div className="absolute left-[23%] top-0 h-2 w-2 rounded-full bg-black/50" />
            <div className="absolute right-[23%] top-0 h-2 w-2 rounded-full bg-black/50" />
        </div>
    );
}

export default Obstacle;