import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import Board from "../components/Board";
import Piece from "../components/Piece";

import { BoardEngine } from "../engine/BoardEngine";
import { PieceFactory } from "../engine/PieceFactory";

const engine = new BoardEngine();

engine.setCell(1, 1, "#06b6d4");
engine.setCell(3, 2, "#06b6d4");
engine.setCell(5, 6, "#06b6d4");

const pieces = PieceFactory.generatePieces();

export default function BlockBlast() {
    return (
        <Layout>

            <Header />

            <main className="flex justify-center p-10">

                <Board board={engine.board} />

                <div className="mt-10 flex justify-center gap-8">

                    {
                        pieces.map((piece, index) =>

                            <Piece

                                key={index}

                                piece={piece}

                            />

                        )
                    }

                </div>
            </main>

        </Layout>
    );
}