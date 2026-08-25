import { useEffect, useRef } from "react";

// import Header from "../../../components/Header";
import Layout from "../../../components/Layout";

import Board from "../components/Board";
import FloatingPiece from "../components/FloatingPiece";
import PieceTray from "../components/PieceTray";

import { useBlockBlast } from "../hooks/useBlockBlast";
import { useDrag } from "../hooks/useDrag";

import { BoardPositionCalculator } from "../utils/BoardPositionCalculator";
import { ScoreBoard } from "../../../components/ScoreBoard";
import { GameOverModal } from "../../../components/GameOverModal";

import type { GameResult } from "../../../adventure/models/GameResult";

interface BlockBlastProps {
    targetScore?: number;
    onComplete?: (result: GameResult) => void;
}

export default function BlockBlast({ targetScore, onComplete }: BlockBlastProps) {
    const game = useBlockBlast();

    const drag = useDrag();

    const boardRef = useRef<HTMLDivElement>(null);

    const completionReportedRef = useRef(false);

    const missionCompleted = targetScore !== undefined && game.score >= targetScore;

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
            gameMode: "block-free",
            score: game.score,
        });
    }, [missionCompleted, game.score, onComplete]);

    return (
        <Layout>
            {/* <Header /> */}

            <main
                className="
                    mx-auto
                    flex
                    h-[100dvh]
                    w-full
                    max-w-4xl
                    flex-col
                    items-center
                    overflow-hidden
                    px-3
                    pt-3
                    pb-2
                    sm:px-6
                "

                onPointerMove={(event) => {
                    if (game.gameOver || missionCompleted) {
                        return;
                    }

                    if (!drag.state.dragging) {
                        return;
                    }

                    drag.move(event.clientX, event.clientY);

                    if (!boardRef.current || drag.state.pieceIndex === null) {
                        return;
                    }

                    if (!drag.state.piece) {
                        return;
                    }

                    const position = BoardPositionCalculator.calculate(
                        boardRef.current,
                        event.clientX,
                        event.clientY,
                        drag.state.piece
                    );

                    game.preview(drag.state.pieceIndex, position.row, position.col);
                }}

                onPointerUp={(event) => {
                    if (game.gameOver || missionCompleted) {
                        return;
                    }

                    if (!drag.state.dragging || !boardRef.current || drag.state.pieceIndex === null) {
                        return;
                    }

                    if (!drag.state.piece) {
                        return;
                    }

                    const position = BoardPositionCalculator.calculate(
                        boardRef.current,
                        event.clientX,
                        event.clientY,
                        drag.state.piece
                    );

                    const result = game.play(drag.state.pieceIndex, position.row, position.col);

                    game.clearPreview();

                    drag.end();

                    if (result.gameOver) {
                        // Game Over được xử lý bên dưới.
                    }
                }}
            >
                <ScoreBoard score={game.score} />

                <Board board={game.board} boardRef={boardRef} />

                <PieceTray
                    pieces={game.pieces}

                    onDragStart={(piece, index, event) => {
                        if (game.gameOver || missionCompleted) {
                            return;
                        }

                        drag.start(piece, index, event.clientX, event.clientY);
                    }}
                />

                {drag.state.dragging && drag.state.piece && (
                    <FloatingPiece piece={drag.state.piece} x={drag.state.x} y={drag.state.y} />
                )}

                {game.gameOver && !missionCompleted && (
                    <GameOverModal
                        score={game.score}

                        onRestart={() => {
                            drag.end();

                            game.restart();

                            completionReportedRef.current = false;
                        }}
                    />
                )}
            </main>
        </Layout>
    );
}
