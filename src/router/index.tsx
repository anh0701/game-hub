import { createHashRouter } from "react-router-dom";

import App from "../App";

import Home from "../pages/Home";
import WorldMapPage from "../pages/WorldMapPage";
import AdventurePage from "../pages/AdventurePage";

import { gameRegistry, flattenGameRegistry } from "../games/gameRegistry";

const gameRoutes = flattenGameRegistry(gameRegistry).map((game) => {
    const Component = game.route.component;

    return {
        path: game.route.path,
        element: <Component />,
    };
});

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

            ...gameRoutes,
        ],
    },
]);
