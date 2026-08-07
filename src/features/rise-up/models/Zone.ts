import type { Cloud } from "./Cloud";

export interface Zone {
    id: number;

    startY: number;

    height: number;

    clouds: Cloud[];
}
