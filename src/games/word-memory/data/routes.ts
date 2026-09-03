export const WORD_ROUTES = {
    root: "/word-memory",
    classic: "/word-memory/free",
    levelRoute: "/word-memory/level/:levelId",

    level: (levelId: number) => `/word-memory/level/${levelId}`,
} as const;
