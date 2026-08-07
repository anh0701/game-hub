export interface Circle {
    x: number;
    y: number;
    radius: number;
}

export interface CollisionResult {
    collided: boolean;
    normalX: number;
    normalY: number;
    overlap: number;
}

export function checkCircleCollision(a: Circle, b: Circle): CollisionResult {
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    const distanceSquared = dx * dx + dy * dy;

    const radiusSum = a.radius + b.radius;

    if (distanceSquared >= radiusSum * radiusSum) {
        return {
            collided: false,
            normalX: 0,
            normalY: 0,
            overlap: 0,
        };
    }

    if (distanceSquared === 0) {
        return {
            collided: true,
            normalX: 1,
            normalY: 0,
            overlap: radiusSum,
        };
    }

    const distance = Math.sqrt(distanceSquared);

    return {
        collided: true,

        normalX: dx / distance,

        normalY: dy / distance,

        overlap: radiusSum - distance,
    };
}
