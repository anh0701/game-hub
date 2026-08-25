export interface Friend {
    id: string;
    name: string;
    description: string;
    avatar: string;
}

export const friends: Friend[] = [
    {
        id: "momo",
        name: "Momo",
        description: "A cheerful little cat who loves building things.",
        avatar: "🐱",
    },

    {
        id: "mimi",
        name: "Mimi",
        description: "A clever cat who loves numbers and puzzles.",
        avatar: "🐈",
    },

    {
        id: "leo",
        name: "Leo",
        description: "A brave cat who protects everyone.",
        avatar: "🦁",
    },

    {
        id: "luna",
        name: "Luna",
        description: "A mysterious friend waiting somewhere far away.",
        avatar: "🐈‍⬛",
    },
];
