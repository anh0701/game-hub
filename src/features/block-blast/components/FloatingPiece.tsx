import { CELL_SIZE } from "../constants";
import type { Piece } from "../models/Piece";
import PieceView from "./PieceView";

interface Props {
    piece: Piece;
    x: number;
    y: number;
}

export default function FloatingPiece({
    piece,
    x,
    y,
}: Props) {

    return (

        <div
            className="fixed pointer-events-none z-50"
            style={{
                left:
                    x -
                    piece.anchor.col * CELL_SIZE,

                top:
                    y -
                    piece.anchor.row * CELL_SIZE,
            }}
        >
            <PieceView piece={piece} />
        </div>

    );

}