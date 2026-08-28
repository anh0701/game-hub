import type { Match3Level } from "../models/Match3Level";

export const MATCH3_LEVELS: Match3Level[] = [
    {
        id: 1,

        timeLimit: 60,

        objectives: [
            {
                type: "clear_blocks",
                target: 20,
            },
        ],
    },

    {
        id: 2,

        timeLimit: 60,

        objectives: [
            {
                type: "clear_blocks",
                target: 30,
                color: "red",
            },
        ],
    },

    {
        id: 3,

        timeLimit: 55,

        objectives: [
            {
                type: "clear_blocks",
                target: 40,
            },
        ],
    },

    {
        id: 4,

        timeLimit: 55,

        objectives: [
            {
                type: "clear_blocks",
                target: 20,
                color: "blue",
            },
            {
                type: "clear_blocks",
                target: 20,
                color: "yellow",
            },
        ],
    },

    {
        id: 5,

        timeLimit: 50,

        objectives: [
            {
                type: "clear_blocks",
                target: 50,
            },
        ],
    },
];
