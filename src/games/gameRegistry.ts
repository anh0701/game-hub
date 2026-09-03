import type { ComponentType } from "react";

import { FaHashtag, FaPuzzlePiece } from "react-icons/fa";
import { FaBrain, FaShieldHalved } from "react-icons/fa6";

import BlockBlast from "./block/pages/BlockBlast";
import BlockBlastModePage from "./block/pages/BlockBlastModePage";
import LevelBlockBlast from "./block/pages/LevelBlockBlast";
import Match3BlockBlast from "./block/pages/Match3BlockBlast";
import Match3Level from "./block/pages/Match3Level";

import { BLOCK_ROUTES } from "./block/constants/routes";

import { SudokuPage } from "./sudoku/pages/SudokuPage";
import RiseUpModePage from "./shield/RiseUpModePage";
import { WORD_ROUTES } from "./word-memory/data/routes";
import WordMemoryLevelPage from "./word-memory/pages/WordMemoryLevel";
import { WordMemoryMode } from "./word-memory/pages/WordMemoryMode";
import WordMemory from "./word-memory/pages/WordMemory";

export interface GameRegistryEntry {
    id: string;

    title: string;

    icon?: ComponentType<{ className?: string }>;

    iconClassName?: string;

    route: {
        path: string;
        component: ComponentType;
    };

    children?: readonly GameRegistryEntry[];
}

export function flattenGameRegistry(games: readonly GameRegistryEntry[]): GameRegistryEntry[] {
    return games.flatMap((game) => [game, ...flattenGameRegistry(game.children ?? [])]);
}

export const gameRegistry: readonly GameRegistryEntry[] = [
    {
        id: "block",
        title: "Block Blast",

        icon: FaPuzzlePiece,
        iconClassName: "text-violet-400",

        route: {
            path: BLOCK_ROUTES.root,
            component: BlockBlastModePage,
        },

        children: [
            {
                id: "block-classic",
                title: "Classic",

                route: {
                    path: BLOCK_ROUTES.classic,
                    component: BlockBlast,
                },
            },

            {
                id: "block-levels",
                title: "Levels",

                route: {
                    path: BLOCK_ROUTES.levels,
                    component: LevelBlockBlast,
                },
            },

            {
                id: "block-match3",
                title: "Match 3",

                route: {
                    path: BLOCK_ROUTES.match3board,
                    component: Match3BlockBlast,
                },
            },

            {
                id: "block-match3-level",
                title: "Match 3 Levels",

                route: {
                    path: BLOCK_ROUTES.match3level,
                    component: Match3Level,
                },
            },
        ],
    },

    {
        id: "sudoku",
        title: "Sudoku",

        icon: FaHashtag,
        iconClassName: "text-blue-400",

        route: {
            path: "/sudoku",
            component: SudokuPage,
        },
    },

    {
        id: "shield",
        title: "Shield",

        icon: FaShieldHalved,
        iconClassName: "text-emerald-400",

        route: {
            path: "/shield",
            component: RiseUpModePage,
        },
    },

    {
        id: "word-memory",
        title: "Word Memory",

        icon: FaBrain,
        iconClassName: "text-pink-400",

        route: {
            path: WORD_ROUTES.root,
            component: WordMemoryMode,
        },
        children: [
            {
                id: "word-classic",
                title: "Classic",

                route: {
                    path: WORD_ROUTES.classic,
                    component: WordMemory,
                },
            },

            {
                id: "word-levels",
                title: "Levels",

                route: {
                    path: WORD_ROUTES.levelRoute,
                    component: WordMemoryLevelPage,
                },
            },
        ],
    },
];
