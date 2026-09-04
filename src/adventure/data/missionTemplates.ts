import type { MissionTemplate } from "../models/MissionTemplate";

export const missionTemplates: MissionTemplate[] = [
    // =========================
    // BLOCK
    // =========================

    {
        id: "block-score-easy",
        gameId: "block",
        type: "score",
        difficulty: "easy",
        minTarget: 500,
        maxTarget: 1000,
        title: "Break the Seal",
        description: "Reach {target} points.",
        gameMode: "block-free",
    },

    {
        id: "block-score-normal",
        gameId: "block",
        type: "score",
        difficulty: "normal",
        minTarget: 1000,
        maxTarget: 2000,
        title: "Break the Strong Seal",
        description: "Reach {target} points.",
        gameMode: "block-free",
    },

    {
        id: "block-score-hard",
        gameId: "block",
        type: "score",
        difficulty: "hard",
        minTarget: 2000,
        maxTarget: 3500,
        title: "Break the Ancient Seal",
        description: "Reach {target} points.",
        gameMode: "block-free",
    },

    {
        id: "block-level-easy",
        gameId: "block",
        type: "level",
        difficulty: "easy",
        minTarget: 2,
        maxTarget: 3,
        title: "Take the First Step",
        description: "Reach level {target}.",
        gameMode: "block-level",
    },

    {
        id: "block-level-normal",
        gameId: "block",
        type: "level",
        difficulty: "normal",
        minTarget: 4,
        maxTarget: 6,
        title: "Climb Higher",
        description: "Reach level {target}.",
        gameMode: "block-level",
    },

    {
        id: "block-level-hard",
        gameId: "block",
        type: "level",
        difficulty: "hard",
        minTarget: 7,
        maxTarget: 10,
        title: "Master the Blocks",
        description: "Reach level {target}.",
        gameMode: "block-level",
    },

    {
        id: "block-match3-easy",
        gameId: "block",
        type: "score",
        difficulty: "normal",
        minTarget: 500,
        maxTarget: 1000,
        title: "Break the Seal",
        description: "Reach {target} points.",
        gameMode: "block-match3",
    },

    {
        id: "block-match3-normal",
        gameId: "block",
        type: "score",
        difficulty: "normal",
        minTarget: 1000,
        maxTarget: 2000,
        title: "Break the Strong Seal",
        description: "Reach {target} points.",
        gameMode: "block-match3",
    },

    {
        id: "block-match3-hard",
        gameId: "block",
        type: "score",
        difficulty: "normal",
        minTarget: 2000,
        maxTarget: 3500,
        title: "Break the Ancient Seal",
        description: "Reach {target} points.",
        gameMode: "block-match3",
    },

    {
        id: "block-match3-level-easy",
        gameId: "block",
        type: "level",
        difficulty: "normal",
        minTarget: 1,
        maxTarget: 3,
        title: "Break the Seal",
        description: "Reach level {target}",
        gameMode: "block-match3-level",
    },

    {
        id: "block-match3-level-normal",
        gameId: "block",
        type: "level",
        difficulty: "normal",
        minTarget: 4,
        maxTarget: 6,
        title: "Break the Strong Seal",
        description: "Reach level {target}",
        gameMode: "block-match3-level",
    },

    {
        id: "block-match3-level-hard",
        gameId: "block",
        type: "level",
        difficulty: "normal",
        minTarget: 7,
        maxTarget: 10,
        title: "Break the Ancient Seal",
        description: "Reach level {target}",
        gameMode: "block-match3-level",
    },

    // =========================
    // SUDOKU
    // =========================

    {
        id: "sudoku-boards-easy",
        gameId: "sudoku",
        type: "boards",
        difficulty: "easy",
        minTarget: 1,
        maxTarget: 1,
        title: "Solve the Puzzle",
        description: "Solve {target} Sudoku board.",
        gameMode: "sudoku",
    },

    {
        id: "sudoku-boards-normal",
        gameId: "sudoku",
        type: "boards",
        difficulty: "normal",
        minTarget: 1,
        maxTarget: 2,
        title: "Help Luna",
        description: "Solve {target} Sudoku boards.",
        gameMode: "sudoku",
    },

    {
        id: "sudoku-boards-hard",
        gameId: "sudoku",
        type: "boards",
        difficulty: "hard",
        minTarget: 2,
        maxTarget: 3,
        title: "Master the Village",
        description: "Solve {target} Sudoku boards.",
        gameMode: "sudoku",
    },

    {
        id: "sudoku-boards-extreme",
        gameId: "sudoku",
        type: "boards",
        difficulty: "extreme",
        minTarget: 3,
        maxTarget: 4,
        title: "Break the Ancient Puzzle",
        description: "Solve {target} Sudoku boards.",
        gameMode: "sudoku",
    },

    // =========================
    // SHIELD
    // =========================

    {
        id: "shield-score-easy",
        gameId: "shield",
        type: "score",
        difficulty: "easy",
        minTarget: 300,
        maxTarget: 600,
        title: "Protect Finn",
        description: "Reach {target} points.",
        gameMode: "shield",
    },

    {
        id: "shield-score-normal",
        gameId: "shield",
        type: "score",
        difficulty: "normal",
        minTarget: 600,
        maxTarget: 1200,
        title: "Hold the Line",
        description: "Reach {target} points.",
        gameMode: "shield",
    },

    {
        id: "shield-score-hard",
        gameId: "shield",
        type: "score",
        difficulty: "hard",
        minTarget: 1200,
        maxTarget: 2000,
        title: "Protect Finn at All Costs",
        description: "Reach {target} points.",
        gameMode: "shield",
    },

    {
        id: "shield-survive-easy",
        gameId: "shield",
        type: "survive",
        difficulty: "easy",
        minTarget: 20,
        maxTarget: 30,
        title: "Stay Safe",
        description: "Survive for {target} seconds.",
        gameMode: "shield",
    },

    {
        id: "shield-survive-normal",
        gameId: "shield",
        type: "survive",
        difficulty: "normal",
        minTarget: 30,
        maxTarget: 45,
        title: "Hold On",
        description: "Survive for {target} seconds.",
        gameMode: "shield",
    },

    {
        id: "shield-survive-hard",
        gameId: "shield",
        type: "survive",
        difficulty: "hard",
        minTarget: 45,
        maxTarget: 60,
        title: "Survive the Storm",
        description: "Survive for {target} seconds.",
        gameMode: "shield",
    },
    // =========================
    // WORD MEMORY
    // =========================

    {
        id: "word-memory-score-easy",
        gameId: "word-memory",
        type: "score",
        difficulty: "easy",
        minTarget: 300,
        maxTarget: 500,
        title: "Remember the Words",
        description: "Reach {target} points.",
        gameMode: "word-memory",
    },

    {
        id: "word-memory-score-normal",
        gameId: "word-memory",
        type: "score",
        difficulty: "normal",
        minTarget: 500,
        maxTarget: 800,
        title: "Strengthen Your Memory",
        description: "Reach {target} points.",
        gameMode: "word-memory",
    },

    {
        id: "word-memory-score-hard",
        gameId: "word-memory",
        type: "score",
        difficulty: "hard",
        minTarget: 800,
        maxTarget: 1200,
        title: "Master the Memory",
        description: "Reach {target} points.",
        gameMode: "word-memory",
    },
];
