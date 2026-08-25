import type { StoryNode } from "../models/StoryNode";
import { stories } from "../data/stories";
import type { PlayerProgress } from "../models/PlayerProgress";

export function getStory(mapId: string, trigger: StoryNode["trigger"]): StoryNode | undefined {
    return stories.find((story) => story.mapId === mapId && story.trigger === trigger);
}

export function getUnseenStory(
    mapId: string,
    trigger: StoryNode["trigger"],
    progress: PlayerProgress
): StoryNode | undefined {
    return stories.find(
        (story) => story.mapId === mapId && story.trigger === trigger && !progress.seenStoryIds.includes(story.id)
    );
}
