import { useState } from "react";

import { generateSudoku } from "../game/Generator";
import { isBoardCompleted } from "../game/Board";

import type { Cell } from "../models/Cell";
import type { Position } from "../models/Position";

export function useSudoku() {
    const [board, setBoard] = useState<Cell[][]>([]);

    const [solution, setSolution] = useState<number[][]>([]);

    const [score, setScore] = useState(0);

    const [selectedCell, setSelectedCell] = useState<Position | null>(null);

    const [gameOver, setGameOver] = useState(false);

    const [showAnswer, setShowAnswer] = useState(false);

    const [usedHint, setUsedHint] = useState(false);

    // Board dùng để hiển thị
    const displayBoard = showAnswer
        ? board.map((row, rowIndex) =>
              row.map((cell, colIndex) => ({
                  ...cell,
                  value: solution[rowIndex]?.[colIndex] ?? cell.value,
                  error: false,
              }))
          )
        : board;

    function startGame() {
        const { puzzle, solution } = generateSudoku();

        setBoard(puzzle);
        setSolution(solution);

        setSelectedCell(null);
        setGameOver(false);
        setShowAnswer(false);
        setUsedHint(false);
    }

    function selectCell(position: Position) {
        if (gameOver) {
            return;
        }

        setSelectedCell(position);
    }

    function inputNumber(value: number) {
        if (selectedCell === null || showAnswer) {
            return;
        }

        const { row, col } = selectedCell;

        if (board[row][col].fixed) {
            return;
        }

        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

        newBoard[row][col].value = value;

        if (solution[row][col] !== value) {
            newBoard[row][col].error = true;

            setBoard(newBoard);

            setTimeout(() => {
                setGameOver(true);
            }, 500);

            return;
        }

        setBoard(newBoard);

        if (isBoardCompleted(newBoard)) {
            if (!usedHint) {
                setScore((prev) => prev + 1);
            }

            startGame();
        }
    }

    function toggleShowAnswer() {
        if (!showAnswer) {
            setUsedHint(true);
        }
        setShowAnswer((prev) => !prev);
    }

    function restart() {
        setScore(0);

        startGame();
    }

    return {
        board: displayBoard,

        score,
        gameOver,
        selectedCell,
        showAnswer,

        startGame,
        selectCell,
        inputNumber,
        toggleShowAnswer,
        restart,
    };
}
