export function isValidMove(
    board: number[][],
    row: number,
    col: number,
    value: number
): boolean {

    // Check row
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === value) {
            return false;
        }
    }

    // Check column
    for (let r = 0; r < 9; r++) {
        if (board[r][col] === value) {
            return false;
        }
    }

    // Top-left position of the 3x3 block
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    // Check 3x3 block
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] === value) {
                return false;
            }
        }
    }

    return true;
}