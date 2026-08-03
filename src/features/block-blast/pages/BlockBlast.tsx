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

    const boardRef =
        useRef<HTMLDivElement>(null);

    return (

        <Layout>

            <Header />

            <main
                className="mx-auto flex max-w-4xl flex-col items-center py-10"

                onPointerMove={(event) => {

                    if (!drag.state.dragging) {
                        return;
                    }

                    drag.move(
                        event.clientX,
                        event.clientY
                    );

                    if (
                        !boardRef.current ||
                        drag.state.pieceIndex === null
                    ) {

                        return;

                    }

                    const rect =
                        boardRef.current.getBoundingClientRect();

                    if (!drag.state.piece) {
                        return;
                    }

                    const position =
                        BoardPositionCalculator.calculate(
                            rect,
                            event.clientX,
                            event.clientY,
                            drag.state.piece
                        );

                    game.preview(
                        drag.state.pieceIndex,
                        position.row,
                        position.col
                    );

                }}

                onPointerUp={(event) => {

                    if (
                        !drag.state.dragging ||
                        !boardRef.current ||
                        drag.state.pieceIndex === null
                    ) {

                        return;

                    }

                    const rect =
                        boardRef.current.getBoundingClientRect();

                    if (!drag.state.piece) {
                        return;
                    }

                    const position =
                        BoardPositionCalculator.calculate(
                            rect,
                            event.clientX,
                            event.clientY,
                            drag.state.piece
                        );

                    game.play(
                        drag.state.pieceIndex,
                        position.row,
                        position.col
                    );

                    game.clearPreview();

                    drag.end();

                }}

            >

                <Board
                    board={game.board}
                    boardRef={boardRef}
                />

                <div className="mt-8 text-2xl font-bold text-white">

                    Score : {game.score}

                </div>

                <PieceTray

                    pieces={game.pieces}

                    onDragStart={(piece, index, event) => {

                        drag.start(

                            piece,

                            index,

                            event.clientX,

                            event.clientY

                        );

                    }}

                />

                {

                    drag.state.dragging &&
                    drag.state.piece &&

                    (

                        <FloatingPiece

                            piece={drag.state.piece}

                            x={drag.state.x}

                            y={drag.state.y}

                        />

                    )

                }

            </main>

        </Layout>

    );

}