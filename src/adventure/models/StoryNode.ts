export type StoryLineType = "dialogue" | "narration";

export interface StoryLine {
    type: StoryLineType;
    characterId?: string;
    text: string;
}

export interface StoryNode {
    id: string;

    mapId: string;

    trigger: "beforeMission" | "afterMission";

    lines: StoryLine[];
}
