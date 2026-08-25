import type { GameMap } from "../models/Map";

export const gameMaps: GameMap[] = [
    {
        id: "block-world",
        gameId: "block",
        name: "Block World",
        description: "A strange land made of colorful blocks.",
        friendId: "buddy",
        order: 1,
    },

    {
        id: "sudoku-village",
        gameId: "sudoku",
        name: "Sudoku Village",
        description: "A mysterious village filled with ancient puzzles.",
        friendId: "luna",
        order: 2,
    },

    {
        id: "shield-sky",
        gameId: "shield",
        name: "Shield Sky",
        description: "A dangerous sky where Finn is trapped.",
        friendId: "finn",
        order: 3,
    },
];
