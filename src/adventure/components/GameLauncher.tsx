import type { GameResult } from "../models/GameResult";

import BlockBlast from "../../games/block/pages/BlockBlast";
import LevelBlockBlast from "../../games/block/pages/LevelBlockBlast";
import { SudokuPage } from "../../games/sudoku/pages/SudokuPage";
import type { GameMode } from "../../types/MissionType";
import RiseUpModePage from "../../games/shield/RiseUpModePage";

interface GameLauncherProps {
    gameMode: GameMode;

    target: number;

    onComplete: (result: GameResult) => void;
}

export function GameLauncher({ gameMode, target, onComplete }: GameLauncherProps) {
    switch (gameMode) {
        case "block-free":
            return <BlockBlast targetScore={target} onComplete={onComplete} />;

        case "block-level":
            return <LevelBlockBlast targetLevel={target} onComplete={onComplete} />;

        case "sudoku":
            return <SudokuPage targetBoards={target} onComplete={onComplete} />;

        case "shield":
            return <RiseUpModePage targetScore={target} onComplete={onComplete} />;

        default:
            return <div>Unsupported game mode.</div>;
    }
}
