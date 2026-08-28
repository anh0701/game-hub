import type { IconType } from "react-icons";
import { FaGamepad, FaLayerGroup } from "react-icons/fa";

import { BLOCK_ROUTES } from "../constants/routes";
import { FaTableCellsLarge } from "react-icons/fa6";

export interface BlockGameMode {
    id: string;
    title: string;
    description: string;
    route: string;
    icon: IconType;
}

export const BLOCK_GAME_MODES: BlockGameMode[] = [
    {
        id: "classic",
        title: "Classic",
        description: "Play freely and beat your high score.",
        route: BLOCK_ROUTES.classic,
        icon: FaGamepad,
    },
    {
        id: "levels",
        title: "Levels",
        description: "Complete levels with different objectives.",
        route: BLOCK_ROUTES.levels,
        icon: FaLayerGroup,
    },
    {
        id: "match3",
        title: "Match 3",
        description: "Match 3 or more blocks of the same color.",
        route: BLOCK_ROUTES.match3board,
        icon: FaTableCellsLarge,
    },
    {
        id: "match3-level",
        title: "Match 3 Level",
        description: "Match 3 or more blocks of the same color.",
        route: BLOCK_ROUTES.match3level,
        icon: FaLayerGroup,
    },
];
