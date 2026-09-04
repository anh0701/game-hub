import type { GameMap } from "../models/Map";

export const gameMaps: GameMap[] = [
    {
        id: "block-world",
        gameId: "block",
        name: "Block World",
        description: "A strange land made of colorful blocks.",
        order: 1,
        friendId: "milo",
    },

    {
        id: "sudoku-village",
        gameId: "sudoku",
        name: "Sudoku Village",
        description: "A mysterious village filled with ancient puzzles.",
        order: 2,
        friendId: "luna",
    },

    {
        id: "shield-sky",
        gameId: "shield",
        name: "Shield Sky",
        description: "A dangerous sky where Finn is trapped.",
        order: 3,
        friendId: "max",
    },
    {
        id: "word-memory",
        gameId: "word-memory",
        name: "Word Memory",
        description: "A mysterious world where memories are hidden.",
        order: 4,
        friendId: "will",
    },
];
