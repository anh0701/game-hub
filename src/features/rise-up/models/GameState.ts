import type { Balloon } from "./Balloon";
import type { Camera } from "./Camera";
import type { Shield } from "./Shield";
import type { Zone } from "./Zone";

export interface GameState {
    balloon: Balloon;

    shield: Shield;

    camera: Camera;

    zones: Zone[];

    score: number;

    gameOver: boolean;
}
