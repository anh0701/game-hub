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

    {
        id: 4,

        initialBlocks: [
            {
                row: 2,
                col: 2,
                color: "red",
            },
            {
                row: 2,
                col: 3,
                color: "blue",
            },
        ],

        objectives: [
            {
                type: "clear_blocks",
                target: 10,
            },
        ],
    },

    {
        id: 5,

        initialBlocks: [
            {
                row: 2,
                col: 2,
                color: "red",
            },
            {
                row: 2,
                col: 3,
                color: "blue",
            },
        ],

        objectives: [
            {
                type: "clear_blocks",
                color: "red",
                target: 10,
            },
        ],
    },
    {
        id: 6,

        initialBlocks: [
            { row: 1, col: 1, color: "blue" },
            { row: 1, col: 2, color: "blue" },
            { row: 2, col: 1, color: "green" },
            { row: 3, col: 6, color: "yellow" },
            { row: 4, col: 6, color: "yellow" },
        ],

        objectives: [
            {
                type: "clear_blocks",
                color: "blue",
                target: 8,
            },
        ],
    },

    {
        id: 7,

        initialBlocks: [
            { row: 1, col: 2, color: "red" },
            { row: 1, col: 3, color: "red" },
            { row: 1, col: 4, color: "red" },

            { row: 5, col: 1, color: "green" },
            { row: 5, col: 2, color: "green" },
            { row: 6, col: 6, color: "purple" },
            { row: 6, col: 7, color: "purple" },
        ],

        objectives: [
            {
                type: "clear_blocks",
                color: "red",
                target: 12,
            },
            {
                type: "score",
                target: 80,
            },
        ],
    },

    {
        id: 8,

        initialBlocks: [
            { row: 0, col: 3, color: "yellow" },
            { row: 1, col: 3, color: "yellow" },
            { row: 2, col: 3, color: "yellow" },

            { row: 5, col: 1, color: "blue" },
            { row: 6, col: 1, color: "blue" },
            { row: 6, col: 2, color: "blue" },

            { row: 7, col: 6, color: "green" },
        ],

        objectives: [
            {
                type: "clear_columns",
                target: 2,
            },
        ],
    },

    {
        id: 9,

        initialBlocks: [
            { row: 1, col: 1, color: "red" },
            { row: 1, col: 2, color: "red" },
            { row: 1, col: 3, color: "red" },

            { row: 2, col: 1, color: "blue" },
            { row: 3, col: 1, color: "blue" },

            { row: 5, col: 5, color: "green" },
            { row: 5, col: 6, color: "green" },
            { row: 6, col: 5, color: "green" },
        ],

        objectives: [
            {
                type: "clear_rows",
                target: 2,
            },
            {
                type: "clear_blocks",
                color: "green",
                target: 6,
            },
        ],
    },

    {
        id: 10,

        initialBlocks: [
            { row: 0, col: 0, color: "purple" },
            { row: 0, col: 1, color: "purple" },

            { row: 1, col: 0, color: "purple" },
            { row: 1, col: 1, color: "purple" },

            { row: 3, col: 6, color: "yellow" },
            { row: 4, col: 6, color: "yellow" },
            { row: 5, col: 6, color: "yellow" },

            { row: 6, col: 2, color: "red" },
            { row: 6, col: 3, color: "red" },
        ],

        objectives: [
            {
                type: "clear_blocks",
                color: "purple",
                target: 12,
            },
            {
                type: "score",
                target: 120,
            },
        ],
    },

    {
        id: 11,

        initialBlocks: [
            { row: 0, col: 2, color: "blue" },
            { row: 1, col: 2, color: "blue" },
            { row: 2, col: 2, color: "blue" },

            { row: 5, col: 4, color: "orange" },
            { row: 5, col: 5, color: "orange" },
            { row: 6, col: 4, color: "orange" },
            { row: 6, col: 5, color: "orange" },

            { row: 7, col: 0, color: "green" },
            { row: 7, col: 1, color: "green" },
        ],

        objectives: [
            {
                type: "clear_columns",
                target: 3,
            },
            {
                type: "clear_blocks",
                color: "orange",
                target: 10,
            },
        ],
    },

    {
        id: 12,

        initialBlocks: [
            { row: 1, col: 1, color: "red" },
            { row: 1, col: 2, color: "red" },
            { row: 1, col: 3, color: "red" },

            { row: 2, col: 1, color: "yellow" },
            { row: 2, col: 3, color: "yellow" },

            { row: 3, col: 1, color: "yellow" },
            { row: 3, col: 2, color: "yellow" },
            { row: 3, col: 3, color: "yellow" },

            { row: 6, col: 6, color: "blue" },
            { row: 7, col: 6, color: "blue" },
        ],

        objectives: [
            {
                type: "clear_rows",
                target: 3,
            },
            {
                type: "score",
                target: 150,
            },
        ],
    },

    {
        id: 13,

        initialBlocks: [
            { row: 0, col: 0, color: "green" },
            { row: 0, col: 1, color: "green" },
            { row: 1, col: 0, color: "green" },

            { row: 2, col: 6, color: "purple" },
            { row: 3, col: 6, color: "purple" },
            { row: 4, col: 6, color: "purple" },

            { row: 5, col: 2, color: "red" },
            { row: 5, col: 3, color: "red" },
            { row: 6, col: 2, color: "red" },
            { row: 6, col: 3, color: "red" },

            { row: 7, col: 5, color: "yellow" },
        ],

        objectives: [
            {
                type: "clear_blocks",
                color: "green",
                target: 10,
            },
            {
                type: "clear_blocks",
                color: "purple",
                target: 8,
            },
        ],
    },

    {
        id: 14,

        initialBlocks: [
            { row: 0, col: 3, color: "blue" },
            { row: 1, col: 3, color: "blue" },
            { row: 2, col: 3, color: "blue" },

            { row: 5, col: 0, color: "orange" },
            { row: 5, col: 1, color: "orange" },
            { row: 6, col: 0, color: "orange" },
            { row: 6, col: 1, color: "orange" },

            { row: 7, col: 4, color: "red" },
            { row: 7, col: 5, color: "red" },
            { row: 7, col: 6, color: "red" },
        ],

        objectives: [
            {
                type: "clear_columns",
                target: 3,
            },
            {
                type: "clear_rows",
                target: 2,
            },
            {
                type: "score",
                target: 180,
            },
        ],
    },

    {
        id: 15,

        initialBlocks: [
            { row: 0, col: 0, color: "purple" },
            { row: 0, col: 1, color: "purple" },
            { row: 1, col: 0, color: "purple" },

            { row: 1, col: 6, color: "yellow" },
            { row: 2, col: 6, color: "yellow" },
            { row: 3, col: 6, color: "yellow" },

            { row: 4, col: 2, color: "green" },
            { row: 4, col: 3, color: "green" },
            { row: 5, col: 2, color: "green" },
            { row: 5, col: 3, color: "green" },

            { row: 6, col: 5, color: "red" },
            { row: 6, col: 6, color: "red" },
            { row: 7, col: 5, color: "red" },
        ],

        objectives: [
            {
                type: "clear_blocks",
                color: "red",
                target: 10,
            },
            {
                type: "clear_blocks",
                color: "green",
                target: 10,
            },
            {
                type: "score",
                target: 200,
            },
        ],
    },
];
