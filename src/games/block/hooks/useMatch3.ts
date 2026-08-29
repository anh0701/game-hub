import { useCallback, useEffect, useRef, useState } from "react";

import { Match3GameController } from "../controllers/Match3GameController";

import type { GameResult } from "../../../adventure/models/GameResult";
import type { Match3Level } from "../models/Match3Level";

interface UseMatch3Options {
    level?: Match3Level;
    levelKey?: string | number;

    targetScore?: number;

    onComplete?: (result: GameResult) => void;
}

export function useMatch3({ level, levelKey, targetScore, onComplete }: UseMatch3Options = {}) {
    const gameRef = useRef<{
        key: string | number | undefined;
        game: Match3GameController;
    } | null>(null);

    /*
     * Free mode:
     *     levelKey === undefined
     *     -> controller chỉ tạo 1 lần
     *
     * Level mode:
     *     levelKey = level.id
     *     -> đổi level sẽ tạo controller mới
     */

    if (!gameRef.current || gameRef.current.key !== levelKey) {
        gameRef.current = {
            key: levelKey,

            game: new Match3GameController(8, 8, level),
        };
    }

    const game = gameRef.current.game;

    const [, forceUpdate] = useState(0);

    const refresh = useCallback(() => {
        forceUpdate((value) => value + 1);
    }, []);

    const missionCompleted = targetScore !== undefined && game.getScore() >= targetScore;

    const currentLevel = game.getLevel();

    const levelPassed = game.isLevelPassed();

    const levelFailed = game.isLevelFailed();

    const timeRemaining = game.getTimeRemaining();

    const objectives = game.getObjectiveProgress();

    const timeUp = game.isTimeUp();

    useEffect(() => {
        if (!game.isAnimating()) {
            return;
        }

        const animation = game.getAnimation();

        let timeout = 0;

        switch (animation) {
            case "clearing":
                timeout = 250;
                break;

            case "falling":
                timeout = 350;
                break;

            case "spawning":
                timeout = 350;
                break;

            default:
                return;
        }

        const timer = window.setTimeout(() => {
            if (animation === "clearing") {
                game.resolveClearPhase();
            }

            if (animation === "falling") {
                game.resolveFallPhase();
            }

            if (animation === "spawning") {
                game.resolveSpawnPhase();
            }

            refresh();
        }, timeout);

        return () => {
            window.clearTimeout(timer);
        };
    }, [game.getAnimation(), game.isAnimating(), refresh]);

    useEffect(() => {
        if (!currentLevel) {
            return;
        }

        if (levelPassed || levelFailed || game.isGameOver()) {
            return;
        }

        const timer = window.setInterval(() => {
            game.tick();

            refresh();
        }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, [currentLevel, levelPassed, levelFailed, game, refresh]);

    const completionReportedRef = useRef(false);

    useEffect(() => {
        if (level) {
            return;
        }

        if (!missionCompleted) {
            return;
        }

        if (completionReportedRef.current) {
            return;
        }

        completionReportedRef.current = true;

        onComplete?.({
            gameId: "block",
            gameMode: "block-match3",
            score: game.getScore(),
        });
    }, [level, missionCompleted, game, onComplete]);

    const handleCellClick = useCallback(
        (row: number, col: number) => {
            if (
                game.isGameOver() ||
                game.isAnimating() ||
                game.isTimeUp() ||
                missionCompleted ||
                levelPassed ||
                levelFailed
            ) {
                return;
            }

            game.select(row, col);

            refresh();
        },
        [game, missionCompleted, levelPassed, levelFailed, refresh]
    );

    const restart = useCallback(() => {
        game.restart();

        completionReportedRef.current = false;

        refresh();
    }, [game, refresh]);

    return {
        board: game.getBoard(),

        score: game.getScore(),

        selectedPosition: game.getSelectedPosition(),

        animation: game.getAnimation(),

        clearingPositions: game.getClearingPositions(),

        fallingPositions: game.getFallingPositions(),

        spawningPositions: game.getSpawningPositions(),

        gameOver: game.isGameOver(),

        animating: game.isAnimating(),

        missionCompleted,

        level: currentLevel,

        levelPassed,

        levelFailed,

        timeRemaining,

        objectives,
        timeUp,

        restart,

        handleCellClick,
    };
}
