import { createHashRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import BlockBlast from "../features/block-blast/pages/BlockBlast";

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
        ],
    },
]);