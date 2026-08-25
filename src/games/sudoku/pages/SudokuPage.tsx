import { useEffect, useRef } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

import { NumberPad } from "../components/NumberPad";
import { ScoreBoard } from "../../../components/ScoreBoard";
import { SudokuBoard } from "../components/SudokuBoard";
import { useSudoku } from "../hooks/useSudoku";
import { GameOverModal } from "../../../components/GameOverModal";

import type { GameResult } from "../../../adventure/models/GameResult";

interface SudokuPageProps {
    targetBoards?: number;
    onComplete?: (result: GameResult) => void;
}

export function SudokuPage({ targetBoards, onComplete }: SudokuPageProps) {
    const {
        board,
        score,
        lives,
        startGame,
        selectCell,
        selectedCell,
        showAnswer,
        toggleShowAnswer,
        inputNumber,
        gameOver,
        restart,

        boardsCompleted,
    } = useSudoku();

    const completionReportedRef = useRef(false);

    const missionCompleted = targetBoards !== undefined && boardsCompleted >= targetBoards;

    useEffect(() => {
        if (!missionCompleted) {
            return;
        }

        if (completionReportedRef.current) {
            return;
        }

        completionReportedRef.current = true;

        onComplete?.({
            gameId: "sudoku",
            gameMode: "sudoku",
            score,
            boardsCompleted,
        });
    }, [missionCompleted, boardsCompleted, score, onComplete]);

    useEffect(() => {
        startGame();
    }, []);

    return (
        <main className="min-h-screen bg-slate-100 p-4">
            <div className="mx-auto flex max-w-md flex-col items-center gap-6">
                {/* Score + Lives */}

                <div className="flex w-full items-center justify-between rounded-xl bg-white px-5 py-3 shadow-sm">
                    <ScoreBoard score={score} />

                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-slate-500">Lives</span>

                        <div className="flex gap-1 text-xl">
                            {Array.from({ length: 3 }).map((_, index) =>
                                index < lives ? (
                                    <FaHeart key={index} className="text-red-500" />
                                ) : (
                                    <FaHeartBroken key={index} className="text-slate-300" />
                                )
                            )}
                        </div>
                    </div>
                </div>

                <SudokuBoard board={board} onCellClick={selectCell} selectedCell={selectedCell} />

                <button
                    onClick={toggleShowAnswer}
                    className="
                        rounded-lg
                        bg-emerald-600
                        px-4
                        py-2
                        font-semibold
                        text-white
                        transition
                        hover:bg-emerald-700
                        active:scale-95
                    "
                >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>

                <NumberPad onNumberClick={inputNumber} />

                {gameOver && !missionCompleted && (
                    <GameOverModal
                        score={score}
                        onRestart={() => {
                            completionReportedRef.current = false;

                            restart();
                        }}
                    />
                )}
            </div>
        </main>
    );
}
