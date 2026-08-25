import type { StoryNode } from "../models/StoryNode";

export const stories: StoryNode[] = [
    {
        id: "block-world-intro",
        mapId: "block-world",
        trigger: "beforeMission",

        lines: [
            {
                type: "narration",
                text: "The first world was made entirely of blocks.",
            },

            {
                type: "narration",
                text: "But something was terribly wrong.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Where am I?",
            },

            {
                type: "narration",
                text: "Cat looked around. The familiar world had disappeared.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Milo should have arrived here before me.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Cat! Over here!",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Milo?! Where are you?",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "I'm trapped! These blocks collapsed around me!",
            },

            {
                type: "narration",
                text: "A faint voice echoed from somewhere beyond the blocks.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Hold on. I'm coming.",
            },

            {
                type: "narration",
                text: "Cat stepped forward into the strange world.",
            },
        ],
    },

    {
        id: "block-world-rescue",
        mapId: "block-world",
        trigger: "afterMission",

        lines: [
            {
                type: "narration",
                text: "After pushing through the blocks, Cat finally found Milo.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "You found me!",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "I told you I would.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "I thought I was never going to get out.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "What happened here?",
            },

            {
                type: "narration",
                text: "Milo's expression suddenly became serious.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "I'm not the only one who disappeared.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "What do you mean?",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "There are others. I saw them being pulled into another world.",
            },

            {
                type: "narration",
                text: "Far away, a strange light appeared in the distance.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then that's where we're going next.",
            },
        ],
    },
];
