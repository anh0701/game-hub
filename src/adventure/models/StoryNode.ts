export type StoryNodeType = "dialogue" | "narration";

export interface StoryLine {
    characterId?: string;
    text: string;
}

export interface StoryNode {
    id: string;

    mapId: string;

    type: StoryNodeType;

    trigger: "beforeMission" | "afterMission";

    lines: StoryLine[];
}
