import type { Obstacle as ObstacleModel } from "../models/Obstacle";

interface ObstacleProps {
    obstacle: ObstacleModel;
    cameraY: number;
}

function Obstacle({ obstacle, cameraY }: ObstacleProps) {
    const screenY = obstacle.y + cameraY;

    const diameter = obstacle.radius * 2;

    return (
        <div
            className="pointer-events-none absolute"
            style={{
                left: obstacle.x,
                top: screenY,

                width: diameter,
                height: diameter,

                transform: `
                    translate(-50%, -50%)
                    rotate(${obstacle.rotation}deg)
                `,
            }}
        >
            {/* Main obstacle */}
            <div className="h-full w-full rounded-full border-4 border-gray-700 bg-gray-500 shadow-lg">
                <div
                    className="absolute rounded-full bg-gray-400"
                    style={{
                        width: obstacle.radius * 0.45,

                        height: obstacle.radius * 0.45,

                        left: obstacle.radius * 0.35,

                        top: obstacle.radius * 0.25,
                    }}
                />

                {/* Cracks */}
                <div className="absolute left-1/2 top-[20%] h-[60%] w-1 -rotate-12 bg-gray-700" />

                <div className="absolute left-[35%] top-1/2 h-1 w-[45%] rotate-45 bg-gray-700" />
            </div>
        </div>
    );
}

export default Obstacle;
