import { useEffect } from "react";
import { NumberPad } from "../components/NumberPad";
import { ScoreBoard } from "../components/ScoreBoard";
import { SudokuBoard } from "../components/SudokuBoard";
import { useSudoku } from "../hooks/useSudoku";
import { GameOverModal } from "../components/GameOverModal";

export function SudokuPage() {
    const {
        board,
        score,
        startGame,
        selectCell,
        selectedCell,
        showAnswer,
        toggleShowAnswer,
        inputNumber,
        gameOver,
        restart,
    } = useSudoku();

    useEffect(() => {
        startGame();
    }, []);

    // console.log("selectedCell:", selectedCell);

    return (
        <main className="min-h-screen bg-slate-100 p-4">
            <div className="mx-auto flex max-w-md flex-col items-center gap-6">
                <h1 className="text-3xl font-bold text-slate-800">Sudoku</h1>

                <ScoreBoard score={score} />

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
                    "
                >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>

                <NumberPad onNumberClick={inputNumber} />

                {gameOver && <GameOverModal score={score} onRestart={restart} />}
            </div>
        </main>
    );
}
