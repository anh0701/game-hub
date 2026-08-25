import type { StoryNode } from "../models/StoryNode";

export const stories: StoryNode[] = [
    {
        id: "block-world-intro",
        mapId: "block-world",
        trigger: "beforeMission",

        lines: [
            {
                type: "narration",
                text: "Cat's friend Milo has disappeared into a strange world made entirely of blocks.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Milo! Where are you?",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Cat! I'm trapped somewhere beyond these blocks!",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Don't worry. I'll find you.",
            },
        ],
    },
    {
        id: "block-world-ending",
        mapId: "block-world",
        trigger: "afterMission",

        lines: [
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
                text: "But I'm not the only one who disappeared.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "What do you mean?",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "I saw Luna being taken somewhere else. There was a strange light...",
            },

            {
                type: "narration",
                text: "Milo had barely escaped, but there was no time to rest.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then we're going to find Luna.",
            },
        ],
    },
    {
        id: "sudoku-world-intro",
        mapId: "sudoku-world",
        trigger: "beforeMission",

        lines: [
            {
                type: "narration",
                text: "After rescuing Milo from the Block World, Cat and Milo followed the strange light.",
            },

            {
                type: "narration",
                text: "It led them to a mysterious world filled with numbers.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "This place is completely different.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "This must be where Luna was taken.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then let's find her.",
            },
        ],
    },
];
