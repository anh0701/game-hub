import { useState } from "react";
import { generateSudoku } from "../game/Generator";
import type { Position } from "../models/Position";
import type { Cell } from "../models/Cell";
import { isBoardCompleted } from "../game/Board";

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

    function selectCell(position: Position) {
        console.log("Select:", position);

        if (gameOver) {
            return;
        }

        if (board[position.row][position.col].fixed) {
            return;
        }

        setSelectedCell(position);
    }

    function inputNumber(value: number) {
        console.log("inputNumber:", value);

        if (selectedCell === null) {
            console.log("selectedCell is null");
            return;
        }

        const { row, col } = selectedCell;

        if (board[row][col].fixed) {
            return;
        }

        if (solution[row][col] !== value) {
            console.log("Wrong answer");
            setGameOver(true);
            return;
        }

        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

        newBoard[row][col].value = value;

        console.log(newBoard[row][col]);

        setBoard(newBoard);

        if (isBoardCompleted(newBoard)) {
            setScore((prev) => prev + 1);

            startGame();

            return;
        }
    }

    return {
        board,
        score,
        gameOver,
        selectedCell,

        startGame,
        selectCell,
        inputNumber,
    };
}
