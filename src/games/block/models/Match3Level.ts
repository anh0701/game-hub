export type Match3ObjectiveType = "clear_blocks";

export interface Match3Objective {
    type: Match3ObjectiveType;

    target: number;

    color?: string;
}

export interface Match3Level {
    id: number;

    // Thời gian hoàn thành, tính bằng giây.
    timeLimit: number;

    objectives: Match3Objective[];
}
