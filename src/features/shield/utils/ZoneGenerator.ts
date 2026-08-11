import type { Cloud } from "../models/Cloud";
import type { Obstacle } from "../models/Obstacle";
import type { Zone } from "../models/Zone";

const ZONE_HEIGHT = 800;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
    return Math.floor(random(min, max + 1));
}

function generateClouds(zoneId: number, startY: number, screenWidth: number): Cloud[] {
    // 25% chance of having no clouds.

    if (Math.random() < 0.25) {
        return [];
    }

    const count = randomInt(2, 5);

    const clouds: Cloud[] = [];

    for (let i = 0; i < count; i++) {
        clouds.push({
            id: `zone-${zoneId}-cloud-${i}`,

            x: random(50, Math.max(50, screenWidth - 50)),

            y: startY - random(100, ZONE_HEIGHT - 100),

            size: random(80, 180),

            speed: random(0.5, 0.9),
        });
    }

    return clouds;
}

function randomObstacleX(radius: number, screenWidth: number): number {
    const centerChance = Math.random();

    // 90% spawn in the center area.
    if (centerChance < 0.9) {
        const minX = screenWidth * 0.4;
        const maxX = screenWidth * 0.6;

        return random(Math.max(radius, minX), Math.min(screenWidth - radius, maxX));
    }

    return random(radius, screenWidth - radius);
}

function generateObstacles(zoneId: number, startY: number, screenWidth: number): Obstacle[] {
    // Early zones are easier.
    const count = zoneId <= 1 ? randomInt(1, 2) : randomInt(1, 4);

    const obstacles: Obstacle[] = [];

    for (let i = 0; i < count; i++) {
        const radius = random(25, 45);

        obstacles.push({
            id: `zone-${zoneId}-obstacle-${i}`,

            x: randomObstacleX(radius, screenWidth),

            y: startY - random(150, ZONE_HEIGHT - 100),

            radius,

            // Horizontal movement.
            vx: random(-40, 40),

            // Vertical movement.
            vy: random(-20, 20),

            rotation: random(0, 360),
        });
    }

    return obstacles;
}

export function generateZone(zoneId: number, screenWidth: number): Zone {
    const startY = -zoneId * ZONE_HEIGHT;

    return {
        id: zoneId,

        startY,

        height: ZONE_HEIGHT,

        clouds: generateClouds(zoneId, startY, screenWidth),

        obstacles: generateObstacles(zoneId, startY, screenWidth),
    };
}
