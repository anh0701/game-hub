import { PieceFactory } from "./PieceFactory";

import type { Piece } from "../models/Piece";

export class PieceManager {

    private pieces: Piece[];

    constructor() {
        this.pieces = PieceFactory.generatePieces();
    }

    getPieces(): Piece[] {
        return this.pieces;
    }

    getPiece(index: number): Piece | undefined {
        return this.pieces[index];
    }

    removePiece(index: number): void {
        this.pieces.splice(index, 1);

        if (this.pieces.length === 0) {
            this.pieces = PieceFactory.generatePieces();
        }
    }

    reset(): void {
        this.pieces = PieceFactory.generatePieces();
    }

}