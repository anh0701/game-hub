import { useRef } from "react";

import Header from "../../../components/Header";
import Layout from "../../../components/Layout";

import Board from "../components/Board";
import FloatingPiece from "../components/FloatingPiece";
import PieceTray from "../components/PieceTray";

import { useBlockBlast } from "../hooks/useBlockBlast";
import { useDrag } from "../hooks/useDrag";

import { BoardPositionCalculator } from "../utils/BoardPositionCalculator";

export default function BlockBlast() {
    const game = useBlockBlast();

    const drag = useDrag();

    const boardRef = useRef<HTMLDivElement>(null);

    return (
        <Layout>
            <Header />

            <main
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-4xl
                    flex-col
                    items-center
                    px-4
                    py-6
                    sm:px-6
                    sm:py-8
                    lg:py-10
                "

                onPointerMove={(event) => {
                    if (game.gameOver) {
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
                    if (game.gameOver) {
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
                        console.log("Game Over");
                    }
                }}
            >
                <Board board={game.board} boardRef={boardRef} />

                <div className="mt-6
                    text-xl
                    font-bold
                    text-white
                    sm:mt-8
                    sm:text-2xl">Score : {game.score}</div>

                <PieceTray
                    pieces={game.pieces}

                    onDragStart={(piece, index, event) => {
                        if (game.gameOver) {
                            return;
                        }

                        drag.start(piece, index, event.clientX, event.clientY);
                    }}
                />

                {drag.state.dragging && drag.state.piece && (
                    <FloatingPiece piece={drag.state.piece} x={drag.state.x} y={drag.state.y} />
                )}
                {game.gameOver && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                        <div className="rounded-2xl bg-slate-800 p-8 text-center shadow-2xl">
                            <h1 className="text-4xl font-bold text-white">Game Over</h1>

                            <p className="mt-4 text-xl text-white">Score : {game.score}</p>

                            <button
                                className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white transition hover:bg-cyan-600"
                                onClick={() => {
                                    drag.end();

                                    game.restart();
                                }}
                            >
                                Restart
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
}
