import type { IconType } from "react-icons";
import { FaGamepad, FaLayerGroup } from "react-icons/fa";
import { WORD_ROUTES } from "./routes";

export interface WordGameMode {
    id: string;
    title: string;
    description: string;
    route: string;
    icon: IconType;
}

export const WORD_GAME_MODES: WordGameMode[] = [
    {
        id: "classic",
        title: "Classic",
        description: "Play freely and beat your high score.",
        route: WORD_ROUTES.classic,
        icon: FaGamepad,
    },
    {
        id: "levels",
        title: "Levels",
        description: "Complete levels with different objectives.",
        route: WORD_ROUTES.level(1),
        icon: FaLayerGroup,
    },
];
