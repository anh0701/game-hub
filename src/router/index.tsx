import { createHashRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import BlockBlast from "../features/block/pages/BlockBlast";
import { SudokuPage } from "../features/sudoku/pages/SudokuPage";
import RiseUpPage from "../features/shield/RiseUpPage";
import LevelBlockBlast from "../features/block/pages/LevelBlockBlast";
import BlockBlastModePage from "../features/block/pages/BlockBlastModePage";
import { BLOCK_ROUTES } from "../features/block/constants/routes";

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
                element: <RiseUpPage />,
            },
        ],
    },
]);
