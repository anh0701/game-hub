import { BoardEngine } from "./BoardEngine";
import { PieceFactory } from "./PieceFactory";

import type { Board } from "../models/Board";
import type { GameState } from "../models/GameState";
import type { Piece } from "../models/Piece";
import type { PlayResult } from "../models/PlayResult";

export class GameController {

    private readonly boardEngine: BoardEngine;

    private readonly state: GameState;

    constructor(rows = 8, cols = 8) {

        this.boardEngine = new BoardEngine(rows, cols);

        this.state = {
            score: 0,
            pieces: PieceFactory.generatePieces(),
            gameOver: false,
        };

    }

    getBoard(): Board {
        return this.boardEngine.board;
    }

    getPieces(): Piece[] {
        return this.state.pieces;
    }

    getScore(): number {
        return this.state.score;
    }

    isGameOver(): boolean {
        return this.state.gameOver;
    }

    play(
        pieceIndex: number,
        row: number,
        col: number
    ): PlayResult {

        const piece = this.state.pieces[pieceIndex];

        if (!piece) {
            return {
                success: false,
                clearedRows: [],
                clearedColumns: [],
                scoreGained: 0,
                gameOver: this.state.gameOver,
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
                gameOver: this.state.gameOver,
            };
        }

        const cleared =
            this.boardEngine.clearCompletedLines();

        const score =
            this.calculateScore(
                piece,
                cleared.rows.length,
                cleared.cols.length
            );

        this.state.score += score;

        this.state.pieces.splice(pieceIndex, 1);

        if (this.state.pieces.length === 0) {
            this.state.pieces =
                PieceFactory.generatePieces();
        }

        this.state.gameOver =
            this.checkGameOver();

        return {

            success: true,

            clearedRows: cleared.rows,

            clearedColumns: cleared.cols,

            scoreGained: score,

            gameOver: this.state.gameOver,

        };

    }

    restart() {

        this.boardEngine.reset();

        this.state.score = 0;

        this.state.gameOver = false;

        this.state.pieces =
            PieceFactory.generatePieces();

    }

    private calculateScore(
        piece: Piece,
        rows: number,
        cols: number
    ): number {

        let blocks = 0;

        for (const row of piece.shape) {

            for (const cell of row) {

                if (cell === 1) {
                    blocks++;
                }

            }

        }

        const lines = rows + cols;

        return blocks + lines * 10;

    }

    private checkGameOver(): boolean {

        for (const piece of this.state.pieces) {

            for (
                let row = 0;
                row < this.boardEngine.board.rows;
                row++
            ) {

                for (
                    let col = 0;
                    col < this.boardEngine.board.cols;
                    col++
                ) {

                    if (
                        this.boardEngine.canPlace(
                            piece,
                            row,
                            col
                        )
                    ) {

                        return false;

                    }

                }

            }

        }

        return true;

    }

}