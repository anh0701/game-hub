export interface Game {
    id: string;
    title: string;
    description: string;
    path: string;
    available: boolean;
}

export const games: Game[] = [
    {
        id: "block-blast",
        title: "Block Blast",
        description: "Place blocks and clear lines.",
        path: "/block-blast",
        available: true,
    },
    {
        id: "snake",
        title: "Snake",
        description: "Classic snake game.",
        path: "/snake",
        available: false,
    },
    {
        id: "sudoku",
        title: "Sudoku",
        description: "Logic puzzle.",
        path: "/sudoku",
        available: false,
    },
];