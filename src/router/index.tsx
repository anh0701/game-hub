import { createHashRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import BlockBlast from "../features/block-blast/pages/BlockBlast";
import { SudokuPage } from "../features/sudoku/pages/SudokuPage";
import RiseUpPage from "../features/rise-up/RiseUpPage";

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
                path: "block-blast",
                element: <BlockBlast />,
            },
            {
                path: "sudoku",
                element: <SudokuPage />,
            },
            {
                path: "rise-up",
                element: <RiseUpPage />,
            },
        ],
    },
]);
