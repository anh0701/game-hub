import { useRef, useState } from "react";

import { GameController } from "../engine/GameController";

import type { GameMode } from "../models/GameMode";
import type { Level } from "../models/Level";

export function useBlockBlast(mode: GameMode = "classic") {
    const controller = useRef(new GameController(8, 8, mode));

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

    function startLevel(level: Level) {
        controller.current.startLevel(level);

        refresh();
    }

    return {
        board: controller.current.getBoard(),
        pieces: controller.current.getPieces(),
        score: controller.current.getScore(),
        gameOver: controller.current.isGameOver(),
        levelPassed: controller.current.isLevelPassed(),
        objectives: controller.current.getObjectives(),
        clearedRows: controller.current.getClearedRows(),
        clearedColumns: controller.current.getClearedColumns(),
        level: controller.current.getLevel(),
        objectiveProgress: controller.current.getObjectiveProgress(),

        play,
        preview,
        clearPreview,
        restart,
        startLevel,
    };
}
