import { createHashRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import BlockBlast from "../features/block/pages/BlockBlast";
import { SudokuPage } from "../features/sudoku/pages/SudokuPage";
import RiseUpPage from "../features/shield/RiseUpPage";

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
                path: "block",
                element: <BlockBlast />,
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
