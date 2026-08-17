export type ObjectiveType = "score" | "clear_rows" | "clear_columns" | "clear_blocks";

export interface LevelObjective {
    type: ObjectiveType;
    target: number;
}

export interface InitialBlock {
    row: number;
    col: number;
    color: string;
}

export interface Level {
    id: number;
    initialBlocks: InitialBlock[];
    objectives: LevelObjective[];
}
