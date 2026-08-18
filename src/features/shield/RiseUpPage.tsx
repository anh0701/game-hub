import { useEffect, useState } from "react";

import Balloon from "./components/Balloon";
import Cloud from "./components/Cloud";
import Shield from "./components/shields/Shield";

import { useBoardSize } from "./hooks/useBoardSize";
import { useGameLoop } from "./hooks/useGameLoop";
import { usePointer } from "./hooks/usePointer";
import { updateGame } from "./hooks/updateGame";

import type { GameState } from "./models/GameState";
import type { GameSetup } from "./models/GameSetup";

import { GameOverModal } from "../../components/GameOverModal";
import Obstacle from "./components/obstacles/Obstacle";

interface RiseUpPageProps {
    setup: GameSetup;
}

const obstacleTypeMap = {
    bugs: "bug",
    rocks: "rock",
    meteors: "meteor",
} as const;

const shieldColors = {
    white: "#ffffff",
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#facc15",
    purple: "#a855f7",
    orange: "#f97316",
};

function RiseUpPage({ setup }: RiseUpPageProps) {
    const { ref, size } = useBoardSize<HTMLDivElement>();

    const pointer = usePointer();

    const [game, setGame] = useState<GameState>(createInitialGame());

    const shieldColor = shieldColors[setup.shieldColor];

    function createInitialGame(): GameState {
        const balloon = {
            x: 0,
            y: 0,
        };

        return {
            balloon,

            shield: {
                x: balloon.x,
                y: balloon.y,
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

        setGame((prev) => {
            const balloonX = size.width / 2;

            const balloonY = size.height * 0.8;

            return {
                ...prev,

                balloon: {
                    ...prev.balloon,
                    x: balloonX,
                    y: balloonY,
                },

                shield: {
                    ...prev.shield,
                    x: balloonX,
                    y: size.height * 0.65,
                },
            };
        });
    }, [size]);

    useGameLoop((deltaTime) => {
        setGame((prev) => updateGame(prev, deltaTime, pointer, size));
    });

    return (
        <div
            ref={ref}
            className="
                touch-none
                relative
                h-screen
                w-screen
                overflow-hidden
                bg-sky-300
            "
        >

            {game.zones.map((zone) => zone.clouds.map((cloud) => <Cloud key={cloud.id} cloud={cloud} />))}

            {game.zones.map((zone) =>
                zone.obstacles.map((obstacle) => (
                    <Obstacle
                        key={obstacle.id}
                        obstacle={obstacle}
                        cameraY={game.camera.y}
                        type={obstacleTypeMap[setup.mapType]}
                    />
                ))
            )}

            <div
                className="
                    absolute
                    left-4
                    top-4
                    z-50
                    rounded-lg
                    bg-white/80
                    px-3
                    py-2
                    text-sm
                    shadow
                "
            >
                Score: {Math.floor(game.score)}
            </div>

            <Shield shield={game.shield} type={setup.shieldType} color={shieldColor} />

            <Balloon balloon={game.balloon} />

            {game.gameOver && <GameOverModal score={Math.floor(game.score)} onRestart={handleRestart} />}
        </div>
    );
}

export default RiseUpPage;
