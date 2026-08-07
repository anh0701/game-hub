import { useEffect, useState } from "react";

import Balloon from "./components/Balloon";
import Cloud from "./components/Cloud";
import Shield from "./components/Shield";

import { useBoardSize } from "./hooks/useBoardSize";
import { useGameLoop } from "./hooks/useGameLoop";

import type { GameState } from "./models/GameState";

import { generateZone } from "./utils/ZoneGenerator";
import type { Zone } from "./models/Zone";
import { usePointer } from "./hooks/usePointer";

const ZONE_HEIGHT = 1000;

function RiseUpPage() {
    const { ref, size } = useBoardSize<HTMLDivElement>();

    const pointer = usePointer();

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

        zones: [],

        obstacles: [],

        score: 0,

        gameOver: false,
    });

    useEffect(() => {
        if (size.width === 0 || size.height === 0) {
            return;
        }

        const initialZones: Zone[] = [];

        for (let i = 0; i < 5; i++) {
            initialZones.push(generateZone(i, size.width));
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

            zones: initialZones,
        }));
    }, [size]);

    useGameLoop((deltaTime) => {
        setGame((prev) => {
            const nextCameraY =
                prev.camera.y +
                prev.camera.speed * deltaTime;

            let zones = prev.zones;

            const requiredZoneCount =
                Math.ceil(
                    (nextCameraY + size.height) /
                    ZONE_HEIGHT
                ) + 1;

            if (
                size.width > 0 &&
                zones.length < requiredZoneCount
            ) {
                zones = [...zones];

                while (
                    zones.length <
                    requiredZoneCount
                ) {
                    const zoneId = zones.length;

                    zones.push(
                        generateZone(
                            zoneId,
                            size.width
                        )
                    );
                }
            }

            /*
             * Shield follows pointer.
             */
            const shieldRadius = prev.shield.radius;

            const shieldX = Math.max(
                shieldRadius,
                Math.min(
                    pointer.x,
                    size.width - shieldRadius
                )
            );

            const shieldY = Math.max(
                shieldRadius,
                Math.min(
                    pointer.y,
                    size.height - shieldRadius
                )
            );

            return {
                ...prev,

                camera: {
                    ...prev.camera,
                    y: nextCameraY,
                },

                shield: {
                    ...prev.shield,
                    x: shieldX,
                    y: shieldY,
                },

                zones,

                score:
                    prev.score +
                    deltaTime,
            };
        });
    });

    return (
        <div ref={ref} className="touch-none relative h-screen w-screen overflow-hidden bg-sky-300">
            {game.zones.map((zone) =>
                zone.clouds.map((cloud) => <Cloud key={cloud.id} cloud={cloud} cameraY={game.camera.y} />)
            )}

            <div className="absolute left-4 top-4 z-50 rounded-lg bg-white/80 px-3 py-2 text-sm shadow">
                <div>
                    Board: {Math.round(size.width)} × {Math.round(size.height)}
                </div>

                <div>Camera Y: {game.camera.y.toFixed(1)}</div>

                <div>Score: {Math.floor(game.score)}</div>

                <div>Zones: {game.zones.length}</div>

                <div>Clouds: {game.zones.reduce((total, zone) => total + zone.clouds.length, 0)}</div>
            </div>

            <Shield shield={game.shield} />

            <Balloon balloon={game.balloon} />
        </div>
    );
}

export default RiseUpPage;
