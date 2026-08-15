import type { Obstacle as ObstacleModel } from "../models/Obstacle";

interface ObstacleProps {
    obstacle: ObstacleModel;
    cameraY: number;
}

const BASE_SIZE = 70;

function Obstacle({ obstacle, cameraY }: ObstacleProps) {
    const screenY = obstacle.y + cameraY;

    const diameter = obstacle.radius * 2;

    const scale = diameter / BASE_SIZE;

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
            {/* Main obstacle */}
            <div className="relative h-full w-full rounded-full border-4 border-gray-700 bg-gray-500 shadow-lg">
                {/* Highlight */}
                <div
                    className="absolute rounded-full bg-gray-400"
                    style={{
                        width: 18,
                        height: 18,

                        left: 14,
                        top: 10,
                    }}
                />

                {/* Crack 1 */}
                <div className="absolute left-1/2 top-[20%] h-[60%] w-1 -translate-x-1/2 -rotate-12 bg-gray-700" />

                {/* Crack 2 */}
                <div className="absolute left-[35%] top-1/2 h-1 w-[45%] -translate-y-1/2 rotate-45 bg-gray-700" />
            </div>
        </div>
    );
}

export default Obstacle;
