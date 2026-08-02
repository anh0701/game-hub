import { BoardEngine } from "./BoardEngine";
import { PieceManager } from "./PieceManager";
import { ScoreManager } from "./ScoreManager";

import type { Board } from "../models/Board";
import type { Piece } from "../models/Piece";
import type { PlayResult } from "../models/PlayResult";
import { GameRule } from "./GameRule";

export class GameController {

    private readonly boardEngine: BoardEngine;

    private readonly pieceManager: PieceManager;

    private readonly scoreManager: ScoreManager;

    private gameOver = false;

    constructor(rows = 8, cols = 8) {

        this.boardEngine = new BoardEngine(rows, cols);

        this.pieceManager = new PieceManager();

        this.scoreManager = new ScoreManager();

    }

    getBoard(): Board {
        return this.boardEngine.board;
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

    play(
        pieceIndex: number,
        row: number,
        col: number
    ): PlayResult {

        const piece =
            this.pieceManager.getPiece(pieceIndex);

        if (!piece) {

            return {
                success: false,
                clearedRows: [],
                clearedColumns: [],
                scoreGained: 0,
                gameOver: this.gameOver,
            };

        }

        const success =
            this.boardEngine.tryPlacePiece(
                piece,
                row,
                col
            );

        if (!success) {

            return {
                success: false,
                clearedRows: [],
                clearedColumns: [],
                scoreGained: 0,
                gameOver: this.gameOver,
            };

        }

        const cleared =
            this.boardEngine.clearCompletedLines();

        const score =
            this.scoreManager.calculate(
                piece,
                cleared.rows.length,
                cleared.cols.length
            );

        this.scoreManager.add(score);

        this.pieceManager.removePiece(pieceIndex);

        this.gameOver =
            GameRule.isGameOver(
                this.boardEngine,
                this.pieceManager.getPieces()
            );

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

    }

    preview(
        pieceIndex: number,
        row: number,
        col: number
    ): void {

        const piece =
            this.pieceManager.getPiece(pieceIndex);

        if (!piece) {
            return;
        }

        this.boardEngine.previewPiece(
            piece,
            row,
            col
        );

    }

    clearPreview(): void {

        this.boardEngine.clearPreview();

    }

}