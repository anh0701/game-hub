import { useEffect, useRef, useState } from "react";
import { FiAward, FiBox, FiCheck, FiGrid } from "react-icons/fi";

import Layout from "../../../components/Layout";

import Board from "../components/Board";
import FloatingPiece from "../components/FloatingPiece";
import PieceTray from "../components/PieceTray";

import { useBlockBlast } from "../hooks/useBlockBlast";
import { useDrag } from "../hooks/useDrag";

import { BoardPositionCalculator } from "../utils/BoardPositionCalculator";
import { GameOverModal } from "../../../components/GameOverModal";
import { levels } from "../constants/levels";
import type { ObjectiveType } from "../models/Level";

export default function LevelBlockBlast() {
    const game = useBlockBlast("level");

    const drag = useDrag();

    const boardRef = useRef<HTMLDivElement>(null);

    const [levelIndex, setLevelIndex] = useState(0);

    useEffect(() => {
        // Luôn start đúng levelIndex hiện tại
        game.startLevel(levels[levelIndex]);
    }, [levelIndex]);

    function nextLevel() {
        const nextIndex = levelIndex + 1;

        if (nextIndex >= levels.length) {
            return;
        }

        setLevelIndex(nextIndex);

        drag.end();

        game.startLevel(levels[nextIndex]);
    }

    function getObjectiveInfo(type: ObjectiveType, color?: string) {
        switch (type) {
            case "score":
                return {
                    label: "Score",
                    icon: FiAward,
                };

            case "clear_rows":
                return {
                    label: "Clear rows",
                    icon: FiGrid,
                };

            case "clear_columns":
                return {
                    label: "Clear columns",
                    icon: FiGrid,
                };

            case "clear_blocks":
                return {
                    label: color ? `Place ${color} blocks` : "Place blocks",
                    icon: FiBox,
                };
        }
    }

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
                    overflow-hidden
                    px-3
                    pt-3
                    pb-2
                    sm:px-6
                "
                onPointerMove={(event) => {
                    if (game.gameOver || game.levelPassed) {
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
                    if (game.gameOver || game.levelPassed) {
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

                    game.play(drag.state.pieceIndex, position.row, position.col);

                    game.clearPreview();

                    drag.end();
                }}

                onPointerCancel={() => {
                    if (drag.state.dragging) {
                        game.clearPreview();
                        drag.end();
                    }
                }}
            >
                <div className="mb-4 flex w-full flex-col items-center">
                    <div className="text-lg font-bold tracking-wide text-white">LEVEL {game.level?.id ?? ""}</div>

                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                        {game.objectiveProgress.map((objective, index) => {
                            const { label, icon: ObjectiveIcon } = getObjectiveInfo(objective.type, objective.color);

                            return (
                                <div
                                    key={index}
                                    className={`
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        px-3
                        py-2
                        text-sm
                        ${
                            objective.completed
                                ? "border-emerald-400/30 bg-emerald-400/10"
                                : "border-white/10 bg-white/5"
                        }
                    `}
                                >
                                    {objective.completed ? (
                                        <FiCheck className="h-4 w-4 text-emerald-400" />
                                    ) : (
                                        <ObjectiveIcon className="h-4 w-4 text-white/50" />
                                    )}

                                    <span className="text-white/70">{label}</span>

                                    <span className="font-semibold text-white">
                                        {objective.current}/{objective.target}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Board board={game.board} boardRef={boardRef} />

                <PieceTray
                    pieces={game.pieces}
                    onDragStart={(piece, index, event) => {
                        if (game.gameOver || game.levelPassed) {
                            return;
                        }

                        drag.start(piece, index, event.clientX, event.clientY);
                    }}
                />

                {drag.state.dragging && drag.state.piece && (
                    <FloatingPiece piece={drag.state.piece} x={drag.state.x} y={drag.state.y} />
                )}

                {/* Level Complete */}
                {game.levelPassed && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-50
                            flex
                            items-center
                            justify-center
                            bg-black/50
                            px-4
                        "
                    >
                        <div
                            className="
                                w-full
                                max-w-sm
                                rounded-2xl
                                bg-slate-900
                                p-6
                                text-center
                                shadow-2xl
                                ring-1
                                ring-white/10
                            "
                        >
                            <div className="text-sm font-medium tracking-widest text-white/50">
                                LEVEL {game.level?.id}
                            </div>

                            <h2 className="mt-2 text-2xl font-bold text-white">Level Complete!</h2>

                            <p className="mt-2 text-sm text-white/50">Nice work!</p>

                            <div className="mt-5 text-3xl font-bold text-white">{game.score}</div>

                            <div className="mt-1 text-xs text-white/40">SCORE</div>

                            {levelIndex < levels.length - 1 ? (
                                <button
                                    type="button"
                                    className="
                                        mt-6
                                        w-full
                                        rounded-xl
                                        bg-white
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        transition
                                        hover:bg-white/90
                                    "
                                    onClick={nextLevel}
                                >
                                    Next Level
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="
                                        mt-6
                                        w-full
                                        rounded-xl
                                        bg-white
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        transition
                                        hover:bg-white/90
                                    "
                                    onClick={() => {
                                        drag.end();

                                        setLevelIndex(0);

                                        game.startLevel(levels[0]);
                                    }}
                                >
                                    Play Again
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Game Over */}
                {game.gameOver && !game.levelPassed && (
                    <GameOverModal
                        score={game.score}
                        onRestart={() => {
                            drag.end();

                            game.restart();
                        }}
                    />
                )}
            </main>
        </Layout>
    );
}
