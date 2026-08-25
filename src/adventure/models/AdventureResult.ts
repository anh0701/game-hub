import type { PlayerProgress } from "./PlayerProgress";
import type { StoryNode } from "./StoryNode";

export interface AdventureResult {
    missionCompleted: boolean;

    rescuedFriend: boolean;

    unlockedMapId?: string;

    rescuedFriendId?: string;

    progress: PlayerProgress;

    story?: StoryNode;
}
