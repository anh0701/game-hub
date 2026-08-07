import { useRef, useState } from "react";

import { GameController } from "../engine/GameController";

export function useBlockBlast() {
    const controller = useRef(new GameController());

    const [, setVersion] = useState(0);

    function refresh() {
        setVersion((v) => v + 1);
    }

    function play(pieceIndex: number, row: number, col: number) {
        const result = controller.current.play(pieceIndex, row, col);

        refresh();

        return result;
    }

    function preview(pieceIndex: number, row: number, col: number) {
        controller.current.preview(pieceIndex, row, col);

        refresh();
    }

    function clearPreview() {
        controller.current.clearPreview();

        refresh();
    }

    function restart() {
        controller.current.restart();

        refresh();
    }

    return {
        board: controller.current.getBoard(),

        pieces: controller.current.getPieces(),

        score: controller.current.getScore(),

        gameOver: controller.current.isGameOver(),

        play,

        preview,

        clearPreview,

        restart,
    };
}
