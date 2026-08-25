import type { Obstacle as ObstacleModel } from "../../models/Obstacle";

interface ObstacleProps {
    obstacle: ObstacleModel;
    cameraY: number;
    type?: "bug" | "rock" | "meteor";
}

import BugObstacle from "./BugObstacle";
import RockObstacle from "./RockObstacle";
import MeteorObstacle from "./MeteorObstacle";

const BASE_SIZE = 70;

function Obstacle({ obstacle, cameraY, type = "bug" }: ObstacleProps) {
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
            {type === "bug" && <BugObstacle size={BASE_SIZE} color={getBugColor(obstacle.color)} />}

            {type === "rock" && <RockObstacle size={BASE_SIZE} />}

            {type === "meteor" && <MeteorObstacle size={BASE_SIZE} color={getMeteorColor(obstacle.color)} />}
        </div>
    );
}

function getBugColor(color?: string) {
    const colors: Record<string, string> = {
        red: "#ef4444",
        blue: "#3b82f6",
        green: "#22c55e",
        yellow: "#eab308",
        purple: "#a855f7",
        orange: "#f97316",
        pink: "#ec4899",
    };

    return colors[color ?? "red"] ?? colors.red;
}

function getMeteorColor(color?: string) {
    const colors: Record<string, string> = {
        red: "#ef4444",
        orange: "#f97316",
        purple: "#a855f7",
    };

    return colors[color ?? "orange"] ?? colors.orange;
}

export default Obstacle;
