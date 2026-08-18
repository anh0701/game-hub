export type BugColor = "red" | "blue" | "green" | "yellow" | "purple" | "orange" | "pink";

export interface Obstacle {
    id: string;

    x: number;
    y: number;

    radius: number;

    vx: number;
    vy: number;

    rotation: number;
    color: BugColor;
}
