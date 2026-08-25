import type { StoryNode } from "../models/StoryNode";

export const stories: StoryNode[] = [
    {
        id: "block-world-intro",

        mapId: "block-world",

        type: "dialogue",

        trigger: "beforeMission",

        lines: [
            {
                characterId: "cat",
                text: "Milo! Where are you?",
            },

            {
                characterId: "milo",
                text: "Help! I'm trapped somewhere beyond these blocks!",
            },

            {
                characterId: "cat",
                text: "Don't worry. I'll come find you!",
            },
        ],
    },

    {
        id: "block-world-rescue",

        mapId: "block-world",

        type: "dialogue",

        trigger: "afterMission",

        lines: [
            {
                characterId: "milo",
                text: "You found me!",
            },

            {
                characterId: "cat",
                text: "I told you I would!",
            },

            {
                characterId: "milo",
                text: "But the others are still missing...",
            },
        ],
    },
];
