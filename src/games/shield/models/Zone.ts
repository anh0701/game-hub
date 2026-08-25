import type { Cloud } from "./Cloud";
import type { Obstacle } from "./Obstacle";

export interface Zone {
    id: number;

    startY: number;

    height: number;

    clouds: Cloud[];

    obstacles: Obstacle[];
}
