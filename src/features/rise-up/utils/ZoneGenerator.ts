import type { Cloud } from "../models/Cloud";
import type { Zone } from "../models/Zone";

const ZONE_HEIGHT = 1000;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
    return Math.floor(random(min, max + 1));
}

export function generateZone(zoneId: number, screenWidth: number): Zone {
    const startY = zoneId * ZONE_HEIGHT;

    /*
     * Random whether this zone has clouds.
     *
     * 25% chance of having no clouds.
     */
    const hasClouds = Math.random() > 0.25;

    if (!hasClouds) {
        return {
            id: zoneId,
            startY,
            height: ZONE_HEIGHT,
            clouds: [],
        };
    }

    /*
     * Random number of clouds.
     */
    const cloudCount = randomInt(2, 5);

    const clouds: Cloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
        const cloud: Cloud = {
            id: `zone-${zoneId}-cloud-${i}`,

            x: random(50, Math.max(50, screenWidth - 50)),

            y: startY + random(100, ZONE_HEIGHT - 100),

            size: random(80, 180),

            speed: random(0.5, 0.9),
        };

        clouds.push(cloud);
    }

    return {
        id: zoneId,
        startY,
        height: ZONE_HEIGHT,
        clouds,
    };
}
