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

    const [lives, setLives] = useState(3);

    const [boardsCompleted, setBoardsCompleted] = useState(0);

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
        setLives(3);
    }

    function selectCell(position: Position) {
        if (gameOver) {
            return;
        }

        setSelectedCell(position);
    }

    function inputNumber(value: number) {
        if (selectedCell === null || showAnswer || gameOver) {
            return;
        }

        const { row, col } = selectedCell;

        if (board[row][col].fixed) {
            return;
        }

        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

        newBoard[row][col].value = value;

        // Nhập sai
        if (solution[row][col] !== value) {
            newBoard[row][col].error = true;

            setBoard(newBoard);

            const remainingLives = lives - 1;

            setLives(remainingLives);

            if (remainingLives <= 0) {
                setTimeout(() => {
                    setGameOver(true);
                }, 500);

                return;
            }

            // Còn mạng → xóa số sai để nhập lại
            setTimeout(() => {
                setBoard((currentBoard) => {
                    const resetBoard = currentBoard.map((row) => row.map((cell) => ({ ...cell })));

                    resetBoard[row][col].value = 0;
                    resetBoard[row][col].error = false;

                    return resetBoard;
                });
            }, 500);

            return;
        }

        // Nhập đúng
        newBoard[row][col].error = false;

        setBoard(newBoard);

        if (isBoardCompleted(newBoard)) {
            if (!usedHint) {
                setScore((prev) => prev + 1);
                setBoardsCompleted((prev) => prev + 1);
            }

            setTimeout(() => {
                startGame();
            }, 300);
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
        lives,
        gameOver,
        selectedCell,
        showAnswer,
        boardsCompleted,

        startGame,
        selectCell,
        inputNumber,
        toggleShowAnswer,
        restart,
    };
}
