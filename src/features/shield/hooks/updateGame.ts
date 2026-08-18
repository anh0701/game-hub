import { FLOWER_RADIUS, FLOWERS } from "../constants/balloon";
import type { GameState } from "../models/GameState";

import { updateObstacle } from "../systems/ObstacleSystem";
import { checkCircleCollision } from "../utils/collision";
import { generateZone } from "../utils/ZoneGenerator";

interface PointerPosition {
    x: number;
    y: number;
}

interface BoardSize {
    width: number;
    height: number;
}

const ZONE_HEIGHT = 1000;

export function updateGame(prev: GameState, deltaTime: number, pointer: PointerPosition, size: BoardSize): GameState {
    // STOP GAME

    if (prev.gameOver) {
        return prev;
    }

    // CAMERA

    const REFERENCE_HEIGHT = 800;

    const speedScale = Math.max(
        0.7,
        Math.min(size.height / REFERENCE_HEIGHT, 1)
    );

    const nextCameraY =
        prev.camera.y +
        prev.camera.speed *
        speedScale *
        deltaTime;

    // GENERATE ZONES

    let zones = prev.zones;

    const requiredZoneCount = Math.ceil((nextCameraY + size.height) / ZONE_HEIGHT) + 1;

    if (size.width > 0 && zones.length < requiredZoneCount) {
        zones = [...zones];

        while (zones.length < requiredZoneCount) {
            const zoneId = zones.length;

            zones.push(generateZone(zoneId, size.width));
        }
    }

    // UPDATE CLOUDS

    zones = zones.map((zone) => ({
        ...zone,

        clouds: zone.clouds.map((cloud) => {
            let nextX = cloud.x + cloud.speed * deltaTime;

            if (nextX < -cloud.size) {
                nextX = size.width + cloud.size;
            }

            if (nextX > size.width + cloud.size) {
                nextX = -cloud.size;
            }

            return {
                ...cloud,
                x: nextX,
            };
        }),
    }));

    // SHIELD → POINTER

    const shieldRadius = prev.shield.radius;

    const targetX = Math.max(shieldRadius, Math.min(pointer.x, size.width - shieldRadius));

    const targetY = Math.max(shieldRadius, Math.min(pointer.y, size.height - shieldRadius));

    // Smooth Shield movement.

    const shieldFollowSpeed = 12;

    const smoothing = 1 - Math.exp(-shieldFollowSpeed * deltaTime);

    const nextShieldX = prev.shield.x + (targetX - prev.shield.x) * smoothing;

    const nextShieldY = prev.shield.y + (targetY - prev.shield.y) * smoothing;

    // UPDATE OBSTACLES

    const shieldBlockedObstacles = new Set<string>();

    zones = zones.map((zone) => ({
        ...zone,

        obstacles: zone.obstacles.map((obstacle) => {
            const result = updateObstacle(obstacle, {
                deltaTime,

                cameraY: nextCameraY,

                shield: {
                    x: nextShieldX,
                    y: nextShieldY,
                    radius: shieldRadius,
                },

                board: {
                    width: size.width,
                },
            });

            if (result.shieldBlocked) {
                shieldBlockedObstacles.add(obstacle.id);
            }

            return result.obstacle;
        }),
    }));

    // BALLOON COLLISION

    let balloonHit = false;

    zones.forEach((zone) => {
        zone.obstacles.forEach((obstacle) => {
            if (shieldBlockedObstacles.has(obstacle.id)) {
                return;
            }

            const obstacleScreenY = obstacle.y + nextCameraY;

            // Balloon center
            const balloonX = prev.balloon.x;
            const balloonY = prev.balloon.y;

            for (const flower of FLOWERS) {
                // FLOWERS are positioned relative to the Balloon container.
                const flowerX = balloonX + (flower.x - 96);
                const flowerY = balloonY + (flower.y - 80);

                const collision = checkCircleCollision(
                    {
                        x: flowerX,
                        y: flowerY,
                        radius: FLOWER_RADIUS,
                    },
                    {
                        x: obstacle.x,
                        y: obstacleScreenY,
                        radius: obstacle.radius,
                    }
                );

                if (collision.collided) {
                    balloonHit = true;
                    break;
                }
            }

            if (balloonHit) {
                return;
            }
        });
    });

    return {
        ...prev,

        camera: {
            ...prev.camera,

            y: nextCameraY,
        },

        zones,

        shield: {
            ...prev.shield,

            x: nextShieldX,
            y: nextShieldY,
        },

        score: prev.score + deltaTime,

        gameOver: prev.gameOver || balloonHit,
    };
}
