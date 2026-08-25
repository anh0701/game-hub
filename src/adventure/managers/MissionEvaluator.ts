import type { Mission } from "../models/Mission";
import type { GameResult } from "../models/GameResult";

export function evaluateMission(mission: Mission, result: GameResult): boolean {
    switch (mission.gameMode) {
        case "block-free":
            return (result.score ?? 0) >= mission.target;

        case "block-level":
            return (result.level ?? 0) >= mission.target;

        case "sudoku":
            return (result.boardsCompleted ?? 0) >= mission.target;

        case "shield":
            return (result.score ?? 0) >= mission.target;

        default:
            return false;
    }
}
