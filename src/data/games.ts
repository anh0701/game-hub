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
        available: true,
    },
    {
        id: "Tic-Tac-Toe",
        title: "Tic Tac Toe",
        description: "Classic 3×3 strategy game.",
        path: "/tic-tac-toe",
        available: false,
    },
    {
        id: "Rock-Paper-Scissors",
        title: "Rock Paper Scissors",
        description: "Beat the computer in a game of chance.",
        path: "/rock-paper-scissors",
        available: false,
    },
    {
        id: "Pong",
        title: "Pong",
        description: "Retro arcade paddle game.",
        path: "/pong",
        available: false,
    },
    {
        id: "Guess-Number",
        title: "Guess Number",
        description: "Find the hidden number with smart guesses.",
        path: "/guess-number",
        available: false,
    },
];
