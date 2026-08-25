import type { GameId } from "../../types/MissionType";

export interface GameMap {
    id: string;

    gameId: GameId;

    name: string;

    description: string;

    friendId: string;

    order: number;
}
