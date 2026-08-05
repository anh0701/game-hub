import { NumberPad } from "../components/NumberPad";
import { ScoreBoard } from "../components/ScoreBoard";
import { SudokuBoard } from "../components/SudokuBoard";

const board = Array.from({ length: 9 }, () => Array(9).fill(undefined));

export function SudokuPage() {
    return (
        <main className="min-h-screen bg-slate-100 p-4">
            <div className="mx-auto flex max-w-md flex-col items-center gap-6">
                <h1 className="text-3xl font-bold text-slate-800">Sudoku</h1>

                <ScoreBoard score={0} />

                <SudokuBoard board={board} />

                <NumberPad
                    onNumberClick={(value) => {
                        console.log(value);
                    }}
                />
            </div>
        </main>
    );
}
