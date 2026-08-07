import type { Balloon } from "./Balloon";
import type { Camera } from "./Camera";
import type { Obstacle } from "./Obstacle";
import type { Shield } from "./Shield";
import type { Zone } from "./Zone";

export interface GameState {
    balloon: Balloon;

    shield: Shield;

    camera: Camera;

    zones: Zone[];

    obstacles: Obstacle[];

    score: number;

    gameOver: boolean;
}
