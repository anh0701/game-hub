import { useState } from "react";
import { generateSudoku } from "../game/Generator";
import type { Position } from "../models/Position";
import type { Cell } from "../models/Cell";

export function useSudoku() {
    const [board, setBoard] = useState<Cell[][]>([]);

    const [solution, setSolution] = useState<number[][]>([]);

    const [score, setScore] = useState(0);

    const [selectedCell, setSelectedCell] = useState<Position | null>(null);

    const [gameOver, setGameOver] = useState(false);

    function startGame() {
        const { puzzle, solution } = generateSudoku();

        setBoard(puzzle);
        setSolution(solution);

        setSelectedCell(null);
        setGameOver(false);
    }

    return {
        board,
        score,
        gameOver,
        selectedCell,

        startGame,
    };
}
