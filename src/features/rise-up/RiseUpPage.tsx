import { useEffect, useState } from "react";

import Balloon from "./components/Balloon";
import Shield from "./components/Shield";

import { useBoardSize } from "./hooks/useBoardSize";
import { useGameLoop } from "./hooks/useGameLoop";

import type { GameState } from "./models/GameState";
import Cloud from "./components/Cloud";

function RiseUpPage() {
    const { ref, size } = useBoardSize<HTMLDivElement>();

    const [game, setGame] = useState<GameState>({
        balloon: {
            x: 0,
            y: 0,
        },

        shield: {
            x: 0,
            y: 0,
            radius: 45,
        },

        camera: {
            x: 0,
            y: 0,
            speed: 120,
        },

        clouds: [],

        obstacles: [],

        score: 0,

        gameOver: false,
    });

    useEffect(() => {
    if (size.width === 0 || size.height === 0) {
        return;
    }

    setGame((prev) => ({
        ...prev,

        balloon: {
            ...prev.balloon,
            x: size.width / 2,
            y: size.height * 0.8,
        },

        shield: {
            ...prev.shield,
            x: size.width / 2,
            y: size.height * 0.65,
        },

        clouds: [
            {
                id: "cloud-1",
                x: size.width * 0.15,
                y: 100,
                size: 120,
                speed: 0.8,
            },
            {
                id: "cloud-2",
                x: size.width * 0.48,
                y: 220,
                size: 170,
                speed: 0.6,
            },
            {
                id: "cloud-3",
                x: size.width * 0.82,
                y: 350,
                size: 100,
                speed: 0.9,
            },
            {
                id: "cloud-4",
                x: size.width * 0.30,
                y: 520,
                size: 150,
                speed: 0.7,
            },
            {
                id: "cloud-5",
                x: size.width * 0.68,
                y: 680,
                size: 130,
                speed: 0.75,
            },
            {
                id: "cloud-6",
                x: size.width * 0.05,
                y: 850,
                size: 180,
                speed: 0.55,
            },
        ],
    }));
}, [size]);

    useGameLoop((deltaTime) => {
        setGame((prev) => ({
            ...prev,

            camera: {
                ...prev.camera,

                y: prev.camera.y + prev.camera.speed * deltaTime,
            },

            score: prev.score + deltaTime,
        }));
    });

    return (
        <div ref={ref} className="relative h-screen w-screen overflow-hidden bg-sky-300">
            {game.clouds.map((cloud) => (
                <Cloud key={cloud.id} cloud={cloud} cameraY={game.camera.y * cloud.speed} />
            ))}

            {/* <div className="absolute left-4 top-4 z-50 rounded-lg bg-white/80 px-3 py-2 text-sm shadow">
                <div>
                    Board: {Math.round(size.width)} × {Math.round(size.height)}
                </div>

                <div>Camera Y: {game.camera.y.toFixed(1)}</div>

                <div>Score: {Math.floor(game.score)}</div>
            </div> */}

            <Shield shield={game.shield} />

            <Balloon balloon={game.balloon} />
        </div>
    );
}

export default RiseUpPage;
