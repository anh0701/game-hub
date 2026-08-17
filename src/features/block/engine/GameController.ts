import { BoardEngine } from "./BoardEngine";
import { PieceManager } from "./PieceManager";
import { ScoreManager } from "./ScoreManager";

import type { Board } from "../models/Board";
import type { Piece } from "../models/Piece";
import type { PlayResult } from "../models/PlayResult";
import { GameRule } from "./GameRule";
import type { Level, LevelObjective } from "../models/Level";
import type { GameMode } from "../models/GameMode";

export class GameController {
    private readonly boardEngine: BoardEngine;

    private readonly pieceManager: PieceManager;

    private readonly scoreManager: ScoreManager;

    private mode: GameMode;

    private level?: Level;

    private gameOver = false;

    private levelPassed = false;

    private clearedRows = 0;

    private clearedColumns = 0;

    constructor(rows = 8, cols = 8, mode: GameMode = "classic", level?: Level) {
        this.mode = mode;
        this.level = level;

        this.boardEngine = new BoardEngine(rows, cols, level?.initialBlocks ?? []);

        this.pieceManager = new PieceManager();

        this.scoreManager = new ScoreManager();
    }

    getBoard(): Board {
        return this.boardEngine.board;
    }

    getLevel(): Level | undefined {
        return this.level;
    }

    getPieces(): Piece[] {
        return this.pieceManager.getPieces();
    }

    getScore(): number {
        return this.scoreManager.getScore();
    }

    isGameOver(): boolean {
        return this.gameOver;
    }

    isLevelPassed(): boolean {
        return this.levelPassed;
    }

    getObjectives(): LevelObjective[] {
        return this.level?.objectives ?? [];
    }

    getClearedRows(): number {
        return this.clearedRows;
    }

    getClearedColumns(): number {
        return this.clearedColumns;
    }

    getObjectiveProgress() {
        return (
            this.level?.objectives.map((objective) => {
                let current = 0;

                switch (objective.type) {
                    case "score":
                        current = this.scoreManager.getScore();
                        break;

                    case "clear_rows":
                        current = this.clearedRows;
                        break;

                    case "clear_columns":
                        current = this.clearedColumns;
                        break;
                }

                return {
                    type: objective.type,
                    current,
                    target: objective.target,
                    completed: current >= objective.target,
                };
            }) ?? []
        );
    }

    play(pieceIndex: number, row: number, col: number): PlayResult {
        const piece = this.pieceManager.getPiece(pieceIndex);

        if (!piece) {
            return {
                success: false,
                clearedRows: [],
                clearedColumns: [],
                scoreGained: 0,
                gameOver: this.gameOver,
            };
        }

        const success = this.boardEngine.tryPlacePiece(piece, row, col);

        if (!success) {
            return {
                success: false,
                clearedRows: [],
                clearedColumns: [],
                scoreGained: 0,
                gameOver: this.gameOver,
            };
        }

        const cleared = this.boardEngine.clearCompletedLines();

        const score = this.scoreManager.calculate(cleared.rows.length, cleared.cols.length);

        this.scoreManager.add(score);

        this.clearedRows += cleared.rows.length;

        this.clearedColumns += cleared.cols.length;

        this.pieceManager.removePiece(pieceIndex);

        this.levelPassed = this.checkLevelObjective();

        this.gameOver = !this.levelPassed && !GameRule.hasMove(this.boardEngine, this.pieceManager.getPieces());
        return {
            success: true,

            clearedRows: cleared.rows,

            clearedColumns: cleared.cols,

            scoreGained: score,

            gameOver: this.gameOver,
        };
    }

    restart(): void {
        this.boardEngine.reset();

        this.pieceManager.reset();

        this.scoreManager.reset();

        this.gameOver = false;

        this.levelPassed = false;

        this.clearedRows = 0;

        this.clearedColumns = 0;
    }

    startLevel(level: Level): void {
        this.mode = "level";

        this.level = level;

        this.boardEngine.setInitialBlocks(level.initialBlocks);

        this.boardEngine.reset();

        this.pieceManager.reset();

        this.scoreManager.reset();

        this.gameOver = false;

        this.levelPassed = false;

        this.clearedRows = 0;

        this.clearedColumns = 0;
    }

    preview(pieceIndex: number, row: number, col: number): void {
        const piece = this.pieceManager.getPiece(pieceIndex);

        if (!piece) {
            return;
        }

        this.boardEngine.previewPiece(piece, row, col);
    }

    clearPreview(): void {
        this.boardEngine.clearPreview();
    }

    private checkLevelObjective(): boolean {
        if (this.mode !== "level" || !this.level) {
            return false;
        }

        return this.level.objectives.every((objective) => {
            switch (objective.type) {
                case "score":
                    return this.scoreManager.getScore() >= objective.target;

                case "clear_rows":
                    return this.clearedRows >= objective.target;

                case "clear_columns":
                    return this.clearedColumns >= objective.target;

                default:
                    return false;
            }
        });
    }
}
