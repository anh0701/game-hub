import { createHashRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import BlockBlast from "../games/block/pages/BlockBlast";
import { SudokuPage } from "../games/sudoku/pages/SudokuPage";
import LevelBlockBlast from "../games/block/pages/LevelBlockBlast";
import BlockBlastModePage from "../games/block/pages/BlockBlastModePage";
import { BLOCK_ROUTES } from "../games/block/constants/routes";
import RiseUpModePage from "../games/shield/RiseUpModePage";
import WorldMapPage from "../pages/WorldMapPage";
import AdventurePage from "../pages/AdventurePage";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "world",
                element: <WorldMapPage />,
            },

            {
                path: "adventure/:mapId",
                element: <AdventurePage />,
            },
            {
                path: BLOCK_ROUTES.root,
                element: <BlockBlastModePage />,
            },
            {
                path: BLOCK_ROUTES.classic,
                element: <BlockBlast />,
            },
            {
                path: BLOCK_ROUTES.levels,
                element: <LevelBlockBlast />,
            },
            {
                path: "sudoku",
                element: <SudokuPage />,
            },
            {
                path: "shield",
                element: <RiseUpModePage />,
            },
        ],
    },
]);
