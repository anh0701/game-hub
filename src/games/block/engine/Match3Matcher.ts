import type { Board } from "../models/Board";

import type { Match3Group, Match3Position } from "../models/Match3Types";

export class Match3Matcher {
    private static readonly DIRECTIONS: Match3Position[] = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
    ];

    static findMatches(board: Board): Match3Group[] {
        const visited = Array.from({ length: board.rows }, () => Array(board.cols).fill(false));

        const groups: Match3Group[] = [];

        for (let row = 0; row < board.rows; row++) {
            for (let col = 0; col < board.cols; col++) {
                if (visited[row][col]) {
                    continue;
                }

                const cell = board.cells[row][col];

                if (!cell.occupied || !cell.color) {
                    continue;
                }

                const group = this.findGroup(board, row, col, visited);

                if (group.cells.length >= 3) {
                    groups.push(group);
                }
            }
        }

        return groups;
    }

    private static findGroup(board: Board, startRow: number, startCol: number, visited: boolean[][]): Match3Group {
        const startCell = board.cells[startRow][startCol];

        const color = startCell.color!;

        const cells: Match3Position[] = [];

        const queue: Match3Position[] = [
            {
                row: startRow,
                col: startCol,
            },
        ];

        visited[startRow][startCol] = true;

        while (queue.length > 0) {
            const current = queue.shift()!;

            cells.push(current);

            for (const direction of this.DIRECTIONS) {
                const nextRow = current.row + direction.row;
                const nextCol = current.col + direction.col;

                if (nextRow < 0 || nextRow >= board.rows || nextCol < 0 || nextCol >= board.cols) {
                    continue;
                }

                if (visited[nextRow][nextCol]) {
                    continue;
                }

                const nextCell = board.cells[nextRow][nextCol];

                if (!nextCell.occupied || nextCell.color !== color) {
                    continue;
                }

                visited[nextRow][nextCol] = true;

                queue.push({
                    row: nextRow,
                    col: nextCol,
                });
            }
        }

        return {
            color,
            cells,
        };
    }
}
