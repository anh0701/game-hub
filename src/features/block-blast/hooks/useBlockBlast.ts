import { useRef, useState } from "react";
import { GameController } from "../engine/GameController";

export function useBlockBlast() {

    const controller = useRef(
        new GameController()
    );

    const [, setVersion] = useState(0);

    const refresh = () => {

        setVersion(v => v + 1);

    };

    return {

        board:
            controller.current.getBoard(),

        pieces:
            controller.current.getPieces(),

        score:
            controller.current.getScore(),

        gameOver:
            controller.current.isGameOver(),

        play(
            pieceIndex: number,
            row: number,
            col: number
        ) {

            const result =
                controller.current.play(
                    pieceIndex,
                    row,
                    col
                );

            if (result.success) {

                refresh();

            }

            return result;

        },

        restart() {

            controller.current.restart();

            refresh();

        }

    };

}