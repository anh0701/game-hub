import type { Obstacle } from "../models/Obstacle";
import { checkCircleCollision } from "../utils/collision";

interface BoardSize {
    width: number;
}

interface ShieldPosition {
    x: number;
    y: number;
    radius: number;
}

interface ObstacleUpdateContext {
    deltaTime: number;
    cameraY: number;
    shield: ShieldPosition;
    board: BoardSize;
}

export interface ObstacleUpdateResult {
    obstacle: Obstacle;
    shieldBlocked: boolean;
}

export function updateObstacle(obstacle: Obstacle, context: ObstacleUpdateContext): ObstacleUpdateResult {
    const { deltaTime, cameraY, shield, board } = context;

    // MOVE OBSTACLE
    let nextX = obstacle.x + obstacle.vx * deltaTime;

    let nextY = obstacle.y + obstacle.vy * deltaTime;

    let nextVx = obstacle.vx;

    //    WALL COLLISION

    if (nextX - obstacle.radius < 0) {
        nextX = obstacle.radius;
        nextVx = Math.abs(nextVx);
    }

    if (nextX + obstacle.radius > board.width) {
        nextX = board.width - obstacle.radius;

        nextVx = -Math.abs(nextVx);
    }

    // SHIELD COLLISION

    const obstacleScreenY = nextY + cameraY;

    const collision = checkCircleCollision(
        {
            x: shield.x,
            y: shield.y,
            radius: shield.radius,
        },
        {
            x: nextX,
            y: obstacleScreenY,
            radius: obstacle.radius,
        }
    );

    // SHIELD PUSH

    if (collision.collided) {
        const pushStrength = 1100;

        let nextVy = obstacle.vy + collision.normalY * pushStrength * deltaTime;

        nextVx += collision.normalX * pushStrength * deltaTime;

        const maxSpeed = 650;

        nextVx = Math.max(-maxSpeed, Math.min(nextVx, maxSpeed));

        nextVy = Math.max(-maxSpeed, Math.min(nextVy, maxSpeed));

        // Push obstacle outside the Shield.

        const pushOut = collision.overlap + 2;

        nextX += collision.normalX * pushOut;

        nextY += collision.normalY * pushOut;

        return {
            obstacle: {
                ...obstacle,

                x: nextX,
                y: nextY,

                vx: nextVx,
                vy: obstacle.vy + 120 * deltaTime,

                rotation: obstacle.rotation + 60 * deltaTime,
            },

            shieldBlocked: true,
        };
    }

    return {
        obstacle: {
            ...obstacle,

            x: nextX,
            y: nextY,

            vx: nextVx,

            vy: obstacle.vy * 0.98,

            rotation: obstacle.rotation + 60 * deltaTime,
        },

        shieldBlocked: false,
    };
}
