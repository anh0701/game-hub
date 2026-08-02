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
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
            }}
        >

            <PieceView piece={piece} />

        </div>

    );

}