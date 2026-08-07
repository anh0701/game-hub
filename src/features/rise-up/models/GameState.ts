import type { Balloon } from "./Balloon";
import type { Camera } from "./Camera";
import type { Cloud } from "./Cloud";
import type { Obstacle } from "./Obstacle";
import type { Shield } from "./Shield";

export interface GameState {
    balloon: Balloon;

    shield: Shield;

    camera: Camera;

    clouds: Cloud[];

    obstacles: Obstacle[];

    score: number;

    gameOver: boolean;
}
