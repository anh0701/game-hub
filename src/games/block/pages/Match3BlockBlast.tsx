import Layout from "../../../components/Layout";
import { ScoreBoard } from "../../../components/ScoreBoard";
import { GameOverModal } from "../../../components/GameOverModal";

import Match3Board from "../components/Match3Board";

import type { GameResult } from "../../../adventure/models/GameResult";
import { useMatch3 } from "../hooks/useMatch3";

interface Match3BlockBlastProps {
    targetScore?: number;
    onComplete?: (result: GameResult) => void;
}

export default function Match3BlockBlast({
    targetScore,
    onComplete,
}: Match3BlockBlastProps) {
    const {
        board,
        score,
        selectedPosition,
        animation,
        clearingPositions,
        fallingPositions,
        spawningPositions,
        gameOver,
        missionCompleted,
        handleCellClick,
        restart,
    } = useMatch3({
        targetScore,
        onComplete,
    });

    return (
        <Layout>
            <main
                className="
                    mx-auto
                    flex
                    h-[100dvh]
                    w-full
                    max-w-4xl
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    px-3
                    py-4
                    sm:px-6
                "
            >
                <ScoreBoard score={score} />

                <div
                    className="
                        mb-2
                        text-center
                        text-sm
                        font-medium
                        text-slate-400
                    "
                >
                    Select two adjacent blocks to swap
                </div>

                <Match3Board
                    board={board}
                    selectedPosition={selectedPosition}
                    animation={animation}
                    clearingPositions={clearingPositions}
                    fallingPositions={fallingPositions}
                    spawningPositions={spawningPositions}
                    onCellClick={handleCellClick}
                />

                <div
                    className="
                        mt-3
                        text-center
                        text-xs
                        text-slate-500
                    "
                >
                    Match 3 or more blocks of the same color
                </div>

                {gameOver && !missionCompleted && (
                    <GameOverModal
                        score={score}
                        onRestart={restart}
                    />
                )}
            </main>
        </Layout>
    );
}