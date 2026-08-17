import type { Level } from "../models/Level";

export const levels: Level[] = [
    {
        id: 1,

        initialBlocks: [
            {
                row: 3,
                col: 3,
                color: "red",
            },
            {
                row: 3,
                col: 4,
                color: "red",
            },
            {
                row: 4,
                col: 3,
                color: "blue",
            },
        ],

        objectives: [
            {
                type: "score",
                target: 50,
            },
        ],
    },

    {
        id: 2,

        initialBlocks: [
            {
                row: 2,
                col: 2,
                color: "red",
            },
            {
                row: 2,
                col: 3,
                color: "red",
            },
            {
                row: 2,
                col: 4,
                color: "blue",
            },
            {
                row: 5,
                col: 5,
                color: "green",
            },
        ],

        objectives: [
            {
                type: "score",
                target: 70,
            },
            {
                type: "clear_rows",
                target: 2,
            },
        ],
    },

    {
        id: 3,

        initialBlocks: [
            {
                row: 1,
                col: 1,
                color: "blue",
            },
            {
                row: 1,
                col: 2,
                color: "blue",
            },
            {
                row: 6,
                col: 5,
                color: "yellow",
            },
        ],

        objectives: [
            {
                type: "clear_columns",
                target: 2,
            },
        ],
    },
];
