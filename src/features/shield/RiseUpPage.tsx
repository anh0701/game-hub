import { useEffect, useState } from "react";

import Balloon from "./components/Balloon";
import Cloud from "./components/Cloud";
import Shield from "./components/Shield";
import { useBoardSize } from "./hooks/useBoardSize";
import { useGameLoop } from "./hooks/useGameLoop";
import type { GameState } from "./models/GameState";
import { usePointer } from "./hooks/usePointer";
import Obstacle from "./components/Obstacle";
import { updateGame } from "./hooks/updateGame";
import { GameOverModal } from "../../components/GameOverModal";

function RiseUpPage() {
    const { ref, size } = useBoardSize<HTMLDivElement>();

    const pointer = usePointer();

    const [game, setGame] = useState<GameState>(createInitialGame());

    function createInitialGame(): GameState {
        return {
            balloon: {
                x: 0,
                y: 0,
            },

            shield: {
                x: 0,
                y: 0,
                radius: 35,
            },

            camera: {
                x: 0,
                y: 0,
                speed: 120,
            },

            zones: [],

            score: 0,

            gameOver: false,
        };
    }

    const handleRestart = () => {
        setGame({
            ...createInitialGame(),

            balloon: {
                x: size.width / 2,
                y: size.height * 0.8,
            },

            shield: {
                x: size.width / 2,
                y: size.height * 0.65,
                radius: 35,
            },
        });
    };

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
        }));
    }, [size]);

    useGameLoop((deltaTime) => {
        setGame((prev) => updateGame(prev, deltaTime, pointer, size));
    });

    return (
        <div ref={ref} className="touch-none relative h-screen w-screen overflow-hidden bg-sky-300">
            {game.zones.map((zone) =>
                zone.clouds.map((cloud) => <Cloud key={cloud.id} cloud={cloud} cameraY={game.camera.y} />)
            )}

            {game.zones.map((zone) =>
                zone.obstacles.map((obstacle) => (
                    <Obstacle key={obstacle.id} obstacle={obstacle} cameraY={game.camera.y} />
                ))
            )}

            {/* <div className="absolute left-4 top-4 z-50 rounded-lg bg-white/80 px-3 py-2 text-sm shadow">
                <div>
                    Board: {Math.round(size.width)} × {Math.round(size.height)}
                </div>

                <div>Camera Y: {game.camera.y.toFixed(1)}</div>

                <div>Score: {Math.floor(game.score)}</div>

                <div>Zones: {game.zones.length}</div>

                <div>Clouds: {game.zones.reduce((total, zone) => total + zone.clouds.length, 0)}</div>
            </div> */}

            <Shield shield={game.shield} />

            <Balloon balloon={game.balloon} />

            {game.gameOver && (
                <GameOverModal
                    score={Math.floor(game.score)}

                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}

export default RiseUpPage;
