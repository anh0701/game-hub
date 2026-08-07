import { useEffect, useState } from "react";

import Balloon from "./components/Balloon";
import Shield from "./components/Shield";

import { useBoardSize } from "./hooks/useBoardSize";
import { useGameLoop } from "./hooks/useGameLoop";

interface BalloonState {
    x: number;
    y: number;
}

interface ShieldState {
    x: number;
    y: number;
    radius: number;
}

interface CameraState {
    y: number;
    speed: number;
}

function RiseUpPage() {
    const { ref, size } = useBoardSize<HTMLDivElement>();

    const [balloon, setBalloon] = useState<BalloonState>({
        x: 0,
        y: 0,
    });

    const [shield, setShield] = useState<ShieldState>({
        x: 0,
        y: 0,
        radius: 45,
    });

    const [camera, setCamera] = useState<CameraState>({
        y: 0,
        speed: 120,
    });

    useEffect(() => {
        if (size.width === 0 || size.height === 0) return;

        setBalloon({
            x: size.width / 2,
            y: size.height * 0.8,
        });

        setShield({
            x: size.width / 2,
            y: size.height * 0.65,
            radius: 45,
        });
    }, [size]);

    useGameLoop((deltaTime) => {
        setCamera((prev) => ({
            ...prev,
            y: prev.y + prev.speed * deltaTime,
        }));
    });

    return (
        <div
            ref={ref}
            className="relative h-screen w-screen overflow-hidden bg-sky-300"
        >
            <div className="absolute left-4 top-4 z-50 rounded bg-white/80 p-2">
                <div>Camera: {camera.y.toFixed(1)}</div>
                <div>
                    Board: {size.width} × {size.height}
                </div>
            </div>

            <Shield
                x={shield.x}
                y={shield.y}
                radius={shield.radius}
            />

            <Balloon
                x={balloon.x}
                y={balloon.y}
            />
        </div>
    );
}

export default RiseUpPage;