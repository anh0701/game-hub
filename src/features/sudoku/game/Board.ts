export function createEmptyBoard(): number[][] {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function cloneBoard(board: number[][]): number[][] {
    return board.map(row => [...row]);
}