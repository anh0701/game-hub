import { useEffect, useRef, useState } from "react";

import Layout from "../../../components/Layout";
import { ScoreBoard } from "../../../components/ScoreBoard";
import { GameOverModal } from "../../../components/GameOverModal";

import Match3Board from "../components/Match3Board";

import { Match3GameController } from "../match3/Match3GameController";

import type { GameResult } from "../../../adventure/models/GameResult";

interface Match3BlockBlastProps {
    targetScore?: number;
    onComplete?: (result: GameResult) => void;
}

export default function Match3BlockBlast({ targetScore, onComplete }: Match3BlockBlastProps) {
    const gameRef = useRef<Match3GameController | null>(null);

    if (!gameRef.current) {
        gameRef.current = new Match3GameController();
    }

    const game = gameRef.current;

    const [, forceUpdate] = useState(0);

    const missionCompleted = targetScore !== undefined && game.getScore() >= targetScore;

    const refresh = () => {
        forceUpdate((value) => value + 1);
    };

    useEffect(() => {
        if (!game.isAnimating()) {
            return;
        }

        const animation = game.getAnimation();

        let timeout = 0;

        if (animation === "clearing") {
            timeout = 250;
        }

        if (animation === "falling") {
            timeout = 350;
        }

        if (animation === "spawning") {
            timeout = 350;
        }

        const timer = window.setTimeout(() => {
            if (animation === "clearing") {
                game.resolveClearPhase();
            }

            if (animation === "falling") {
                game.resolveFallPhase();
            }

            if (animation === "spawning") {
                game.resolveSpawnPhase();
            }

            refresh();
        }, timeout);

        return () => window.clearTimeout(timer);
    }, [game.getAnimation(), game.isAnimating()]);

    const completionReportedRef = useRef(false);

    useEffect(() => {
        if (!missionCompleted) {
            return;
        }

        if (completionReportedRef.current) {
            return;
        }

        completionReportedRef.current = true;

        onComplete?.({
            gameId: "block",
            gameMode: "block-match3",
            score: game.getScore(),
        });
    }, [missionCompleted, game, onComplete]);

    const handleCellClick = (row: number, col: number) => {
        if (game.isGameOver() || game.isAnimating() || missionCompleted) {
            return;
        }

        game.select(row, col);

        refresh();
    };

    const handleRestart = () => {
        game.restart();

        completionReportedRef.current = false;

        refresh();
    };

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
                <ScoreBoard score={game.getScore()} />

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
                    board={game.getBoard()}
                    selectedPosition={game.getSelectedPosition()}
                    animation={game.getAnimation()}
                    clearingPositions={game.getClearingPositions()}
                    fallingPositions={game.getFallingPositions()}
                    spawningPositions={game.getSpawningPositions()}
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

                {game.isGameOver() && !missionCompleted && (
                    <GameOverModal score={game.getScore()} onRestart={handleRestart} />
                )}
            </main>
        </Layout>
    );
}
