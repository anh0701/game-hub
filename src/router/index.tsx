import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import BlockBlast from "../pages/BlockBlast";

export const router = createBrowserRouter([
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