import type { StoryNode } from "../models/StoryNode";

export const stories: StoryNode[] = [
    {
        id: "block-world-intro",
        mapId: "block-world",
        trigger: "beforeMission",

        // rescuedCharacterId: "milo",

        lines: [
            {
                type: "narration",
                text: "It all began on an ordinary day. Cat was looking for his friends when he noticed something strange.",
            },

            {
                type: "narration",
                text: "A mysterious light had appeared in the distance, leading toward a world made entirely of blocks.",
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

            {
                type: "narration",
                text: "Cat stepped into the strange world, determined to bring his friend home.",
            },
        ],
    },

    {
        id: "block-world-ending",
        mapId: "block-world",
        trigger: "afterMission",

        // rescuedCharacterId: "milo",

        lines: [
            {
                type: "narration",
                text: "After making his way through the endless blocks, Cat finally reached Milo.",
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
                text: "Milo pointed toward the fading light in the distance.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then we're going after her.",
            },

            {
                type: "narration",
                text: "The two friends followed the mysterious light into another world.",
            },
        ],
    },

    {
        id: "sudoku-village-intro",
        mapId: "sudoku-village",
        trigger: "beforeMission",

        lines: [
            {
                type: "narration",
                text: "The strange light carried Cat and Milo far away from the Block World.",
            },

            {
                type: "narration",
                text: "When the light finally disappeared, they found themselves in a quiet village filled with mysterious numbers.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "So this is where the light brought us...",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "It looks like a completely different world.",
            },

            {
                type: "narration",
                text: "Every house, every road, and even the signs seemed to be connected to strange number puzzles.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Do you think Luna is here?",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "She has to be. Let's look around.",
            },

            {
                type: "narration",
                text: "But before they could search the village, they noticed something unusual blocking their path.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Looks like we'll have to solve our way through.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then let's get started.",
            },
        ],
    },

    {
        id: "sudoku-village-ending",
        mapId: "sudoku-village",
        trigger: "afterMission",

        lines: [
            {
                type: "narration",
                text: "After solving the village's mysterious puzzles, the path ahead finally opened.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "We made it through!",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "And look over there.",
            },

            {
                type: "narration",
                text: "A faint trail of light could be seen leading toward the mountains.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "That light again...",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "It must be showing us where Luna went.",
            },

            {
                type: "narration",
                text: "The trail disappeared into a stormy sky beyond the village.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "I don't think the next place is going to be peaceful.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Whatever is waiting for us, we'll face it together.",
            },

            {
                type: "narration",
                text: "Together, they followed the light toward the storm.",
            },
        ],
    },

    {
        id: "shield-sky-intro",
        mapId: "shield-sky",
        trigger: "beforeMission",

        lines: [
            {
                type: "narration",
                text: "The light led Cat and Milo high above the clouds.",
            },

            {
                type: "narration",
                text: "They had left the quiet village behind and entered a dangerous sky filled with falling debris.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "We're really high up...",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Stay close to me.",
            },

            {
                type: "narration",
                text: "Suddenly, rocks began falling from the sky.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Watch out!",
            },

            {
                type: "narration",
                text: "Cat raised a mysterious shield that appeared in his paws.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "This shield... maybe it's meant to help us.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Then we'd better learn how to use it.",
            },

            {
                type: "narration",
                text: "Somewhere beyond the storm, another friend was waiting to be rescued.",
            },
        ],
    },

    {
        id: "shield-sky-ending",
        mapId: "shield-sky",
        trigger: "afterMission",

        // rescuedCharacterId: "luna",

        lines: [
            {
                type: "narration",
                text: "After surviving the storm, Cat and Milo finally reached the other side of the clouds.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "We made it.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "And look!",
            },

            {
                type: "narration",
                text: "A familiar figure appeared through the clouds.",
            },

            {
                type: "dialogue",
                characterId: "luna",
                text: "Cat! Milo!",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Luna! We finally found you!",
            },

            {
                type: "dialogue",
                characterId: "luna",
                text: "I knew you would come.",
            },

            {
                type: "narration",
                text: "One more friend had been rescued. But the mysterious light was still shining in the distance.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "Do you think there are more worlds out there?",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "I think our adventure is just beginning.",
            },

            {
                type: "narration",
                text: "Together, the friends looked toward the horizon.",
            },
        ],
    },

    {
        id: "word-memory-intro",
        mapId: "word-memory",
        trigger: "beforeMission",

        lines: [
            {
                type: "narration",
                text: "The mysterious light carried Cat, Milo, and their friends into a strange new world.",
            },

            {
                type: "narration",
                text: "Everything around them was quiet. Floating cards filled the air, each one hiding a forgotten memory.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "What is this place?",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "I don't know. But these cards seem to be hiding something.",
            },

            {
                type: "narration",
                text: "Suddenly, one of the cards began to glow.",
            },

            {
                type: "dialogue",
                characterId: "will",
                text: "Cat! Milo! Can you hear me?",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Will?! Where are you?",
            },

            {
                type: "dialogue",
                characterId: "will",
                text: "I'm trapped somewhere inside this world. You have to find the matching memories.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "So we have to remember our way through?",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then let's find Will.",
            },

            {
                type: "narration",
                text: "Cat stepped toward the floating cards and began searching for the hidden memories.",
            },
        ],
    },

    {
        id: "word-memory-ending",
        mapId: "word-memory",
        trigger: "afterMission",

        lines: [
            {
                type: "narration",
                text: "After matching the final memories, the mysterious world began to disappear.",
            },

            {
                type: "dialogue",
                characterId: "will",
                text: "You found me!",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Of course. We weren't going to leave you behind.",
            },

            {
                type: "dialogue",
                characterId: "will",
                text: "But there's something you should know.",
            },

            {
                type: "dialogue",
                characterId: "milo",
                text: "What is it?",
            },

            {
                type: "narration",
                text: "Will pointed toward a distant light that had appeared beyond the fading world.",
            },

            {
                type: "dialogue",
                characterId: "will",
                text: "That light brought us here. But I think it came from somewhere even farther away.",
            },

            {
                type: "dialogue",
                characterId: "cat",
                text: "Then that's where we're going next.",
            },

            {
                type: "narration",
                text: "The friends gathered together and followed the mysterious light once again.",
            },

            {
                type: "narration",
                text: "Their adventure was far from over.",
            },
        ],
    },
];
