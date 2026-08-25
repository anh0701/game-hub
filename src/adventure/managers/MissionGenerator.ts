import type { Difficulty } from "../../types/MissionType";
import type { GameId } from "../../types/MissionType";
import type { MissionTemplate } from "../models/MissionTemplate";

import { missionTemplates } from "../data/missionTemplates";

import type { Mission } from "../models/Mission";

export function generateMission(gameId: GameId): Mission {
    const difficulty = randomDifficulty();

    const template = getRandomTemplate(gameId, difficulty);

    const target = randomInt(template.minTarget, template.maxTarget);

    return {
        id: `${template.id}-${Date.now()}`,

        gameId: template.gameId,

        type: template.type,

        difficulty: template.difficulty,

        target,

        title: template.title,

        description: template.description.replace("{target}", target.toString()),
        gameMode: template.gameMode,
    };
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDifficulty(): Difficulty {
    const value = Math.random() * 100;

    if (value < 50) {
        return "easy";
    }

    if (value < 85) {
        return "normal";
    }

    if (value < 97) {
        return "hard";
    }

    return "extreme";
}

function getRandomTemplate(gameId: GameId, difficulty: Difficulty): MissionTemplate {
    const candidates = missionTemplates.filter(
        (template) => template.gameId === gameId && template.difficulty === difficulty
    );

    if (candidates.length === 0) {
        throw new Error(`No mission template found for ${gameId} / ${difficulty}`);
    }

    const index = Math.floor(Math.random() * candidates.length);

    return candidates[index];
}
