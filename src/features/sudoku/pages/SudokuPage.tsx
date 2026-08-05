import { useEffect } from "react";
import { NumberPad } from "../components/NumberPad";
import { ScoreBoard } from "../components/ScoreBoard";
import { SudokuBoard } from "../components/SudokuBoard";
import { useSudoku } from "../hooks/useSudoku";

export function SudokuPage() {
    const { board, score, startGame, selectCell } = useSudoku();

    useEffect(() => {
        startGame();
    }, []);
    return (
        <main className="min-h-screen bg-slate-100 p-4">
            <div className="mx-auto flex max-w-md flex-col items-center gap-6">
                <h1 className="text-3xl font-bold text-slate-800">Sudoku</h1>

                <ScoreBoard score={score} />

                <SudokuBoard board={board} onCellClick={selectCell} />

                <NumberPad
                    onNumberClick={(value) => {
                        console.log(value);
                    }}
                />
            </div>
        </main>
    );
}
