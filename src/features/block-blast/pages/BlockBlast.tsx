import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import Board from "../components/Board";
import FloatingPiece from "../components/FloatingPiece";
import PieceTray from "../components/PieceTray";
import { useBlockBlast } from "../hooks/useBlockBlast";
import { useDrag } from "../hooks/useDrag";

export default function BlockBlast() {
    const game = useBlockBlast();

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
                <div className="mb-6 text-3xl font-bold text-white">
                    Score: 
                    {game.score}
                </div>

                <Board board={game.board} />

                <PieceTray
                    pieces={game.pieces}
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