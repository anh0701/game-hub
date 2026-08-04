export const BOARD_CELL_SIZE = 48;

export const TRAY_CELL_SIZE = 30;

export const CELL_GAP = 4;

export const BOARD_PADDING = 12;

export const MOBILE_SCALE = 0.8;

export function getBoardCellSize(): number {
    if (window.innerWidth < 640) {
        return BOARD_CELL_SIZE * 0.8;
    }

    return BOARD_CELL_SIZE;
}
