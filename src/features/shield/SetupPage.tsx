import { useState } from "react";
import type { GameSetup, MapType, ShieldColor, ShieldType } from "./models/GameSetup";
import HandShield from "./components/shields/HandShield";
import CircleShield from "./components/shields/CircleShield";
import StarShield from "./components/shields/StarShield";
import BugObstacle from "./components/obstacles/BugObstacle";
import RockObstacle from "./components/obstacles/RockObstacle";
import MeteorObstacle from "./components/obstacles/MeteorObstacle";

interface SetupPageProps {
    onStart: (setup: GameSetup) => void;
}

const colors: {
    id: ShieldColor;
    value: string;
}[] = [
    {
        id: "white",
        value: "#ffffff",
    },
    {
        id: "red",
        value: "#ef4444",
    },
    {
        id: "blue",
        value: "#3b82f6",
    },
    {
        id: "green",
        value: "#22c55e",
    },
    {
        id: "yellow",
        value: "#facc15",
    },
    {
        id: "purple",
        value: "#a855f7",
    },
    {
        id: "orange",
        value: "#f97316",
    },
];

function SetupPage({ onStart }: SetupPageProps) {
    const [shieldType, setShieldType] = useState<ShieldType>("hand");

    const [shieldColor, setShieldColor] = useState<ShieldColor>("white");

    const [mapType, setMapType] = useState<MapType>("bugs");

    const selectedColor = colors.find((color) => color.id === shieldColor)?.value ?? "#ffffff";

    const handleStart = () => {
        onStart({
            shieldType,
            shieldColor,
            mapType,
        });
    };

    return (
        <div className="min-h-screen bg-sky-400 px-4 py-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-8 text-center text-4xl font-black text-white">Customize Your Game</h1>

                {/* SHIELD */}

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-white">Choose Shield</h2>

                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => setShieldType("hand")}
                            className={`
                            flex flex-col items-center justify-center
                            rounded-2xl p-5
                            transition
                            ${shieldColor === "white" ? "bg-sky-100" : "bg-white"}
                            ${shieldType === "hand" ? "ring-4 ring-yellow-300" : ""}
                        `}
                        >
                            <HandShield size={90} color={selectedColor} />

                            <span className="mt-3 font-bold">Hand</span>
                        </button>

                        <button
                            onClick={() => setShieldType("circle")}
                            className={`
                            flex flex-col items-center justify-center
                            rounded-2xl p-5
                            transition
                            ${shieldColor === "white" ? "bg-sky-100" : "bg-white"}
                            ${shieldType === "circle" ? "ring-4 ring-yellow-300" : ""}
                        `}
                        >
                            <CircleShield size={90} color={selectedColor} />

                            <span className="mt-3 font-bold">Circle</span>
                        </button>

                        <button
                            onClick={() => setShieldType("star")}
                            className={`
                            flex flex-col items-center justify-center
                            rounded-2xl p-5
                            transition
                            ${shieldColor === "white" ? "bg-sky-100" : "bg-white"}
                            ${shieldType === "star" ? "ring-4 ring-yellow-300" : ""}
                        `}
                        >
                            <StarShield size={90} color={selectedColor} />

                            <span className="mt-3 font-bold">Star</span>
                        </button>
                    </div>
                </section>

                {/* COLOR */}

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-white">Choose Color</h2>

                    <div className="flex flex-wrap gap-4">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setShieldColor(color.id)}
                                className={`
                                    h-12 w-12 rounded-full
                                    border-4 border-white
                                    transition
                                    ${shieldColor === color.id ? "scale-125 ring-4 ring-yellow-300" : ""}
                                `}
                                style={{
                                    backgroundColor: color.value,
                                }}
                            />
                        ))}
                    </div>
                </section>

                {/* MAP */}

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-white">Choose Map</h2>

                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => setMapType("bugs")}
                            className={`
                                flex flex-col items-center
                                rounded-2xl bg-white p-5
                                ${mapType === "bugs" ? "ring-4 ring-yellow-300" : ""}
                            `}
                        >
                            <BugObstacle size={80} color="#ef4444" />

                            <span className="mt-3 font-bold">Bugs</span>
                        </button>

                        <button
                            onClick={() => setMapType("rocks")}
                            className={`
                                flex flex-col items-center
                                rounded-2xl bg-white p-5
                                ${mapType === "rocks" ? "ring-4 ring-yellow-300" : ""}
                            `}
                        >
                            <RockObstacle size={80} />

                            <span className="mt-3 font-bold">Rocks</span>
                        </button>

                        <button
                            onClick={() => setMapType("meteors")}
                            className={`
                                flex flex-col items-center
                                rounded-2xl bg-white p-5
                                ${mapType === "meteors" ? "ring-4 ring-yellow-300" : ""}
                            `}
                        >
                            <MeteorObstacle size={80} color="#f97316" />

                            <span className="mt-3 font-bold">Meteors</span>
                        </button>
                    </div>
                </section>

                {/* START */}

                <button
                    onClick={handleStart}
                    className="
                        w-full
                        rounded-2xl
                        bg-white
                        px-6
                        py-4
                        text-xl
                        font-black
                        text-sky-500
                        shadow-lg
                        transition
                        hover:scale-[1.02]
                        active:scale-[0.98]
                    "
                >
                    START GAME
                </button>
            </div>
        </div>
    );
}

export default SetupPage;
