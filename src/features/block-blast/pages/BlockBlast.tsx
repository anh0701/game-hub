import Header from "../../../components/Header";
import Layout from "../../../components/Layout";

import Board from "../components/Board";
import FloatingPiece from "../components/FloatingPiece";
import Piece from "../components/Piece";
import PieceTray from "../components/PieceTray";

import { BoardEngine } from "../engine/BoardEngine";
import { PieceFactory } from "../engine/PieceFactory";
import { useDrag } from "../hooks/useDrag";

const engine = new BoardEngine();

engine.setCell(1, 1, "#06b6d4");
engine.setCell(3, 2, "#06b6d4");
engine.setCell(5, 6, "#06b6d4");

const pieces = PieceFactory.generatePieces();

export default function BlockBlast() {
    const drag = useDrag();
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
                }}
            >

                <Board board={engine.board} />

                <PieceTray
                    pieces={pieces}
                    onDragStart={(
                        piece,
                        index,
                        event
                    ) => {

                        drag.start(
                            piece,
                            index,
                            event.clientX,
                            event.clientY
                        );

                    }}
                />

                {drag.state.dragging && drag.state.piece && (
                    <FloatingPiece
                        piece={drag.state.piece}
                        x={drag.state.x}
                        y={drag.state.y}
                    />
                )}

            </main>

        </Layout>
    );
}