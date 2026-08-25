import { useNavigate } from "react-router-dom";

import { gameMaps } from "../adventure/data/maps";

import { loadProgress } from "../adventure/managers/ProgressManager";

import { startMap } from "../adventure/managers/AdventureManager";

import { FaArrowLeft, FaLock, FaTree } from "react-icons/fa6";

export default function WorldMapPage() {
    const navigate = useNavigate();

    const progress = loadProgress();

    return (
        <main
            className="
                min-h-screen
                bg-slate-950
                px-4
                py-8
                text-white
            "
        >
            <div className="mx-auto max-w-4xl">
                {/* Header */}

                <header>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-white/40
                        transition
                        hover:text-white
                    "
                    >
                        <FaArrowLeft className="text-xs" />
                        Home
                    </button>

                    <h1 className="mt-6 text-3xl font-bold">Adventure Map</h1>

                    <p className="mt-2 text-white/50">Explore new worlds and rescue your friends.</p>
                </header>

                {/* Map list */}

                <section className="mt-8">
                    <div className="relative">
                        {gameMaps.map((map, index) => {
                            const unlocked = progress.unlockedMapIds.includes(map.id);

                            const current = progress.currentMapId === map.id;

                            return (
                                <div key={map.id} className="relative">
                                    {/* Connector */}

                                    {index < gameMaps.length - 1 && (
                                        <div
                                            className={`
                                                absolute
                                                left-6
                                                top-16
                                                h-10
                                                w-px
                                                ${unlocked ? "bg-green-500/40" : "bg-white/10"}
                                            `}
                                        />
                                    )}

                                    <button
                                        type="button"
                                        disabled={!unlocked}
                                        onClick={() => {
                                            if (!unlocked) {
                                                return;
                                            }

                                            const updatedProgress = startMap(progress, map.id);

                                            console.log("START MAP", updatedProgress);

                                            navigate(`/adventure/${map.id}`);
                                        }}
                                        className={`
                                            relative
                                            mb-4
                                            w-full
                                            rounded-2xl
                                            p-5
                                            text-left
                                            ring-1
                                            transition

                                            ${
                                                current
                                                    ? `
                                                        bg-white
                                                        text-slate-900
                                                        ring-white
                                                    `
                                                    : unlocked
                                                      ? `
                                                            bg-white/5
                                                            ring-white/10
                                                            hover:bg-white/10
                                                        `
                                                      : `
                                                            cursor-not-allowed
                                                            bg-white/[0.02]
                                                            opacity-40
                                                            ring-white/5
                                                        `
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}

                                            <div
                                                className={`
                                                    flex
                                                    h-12
                                                    w-12
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    text-2xl

                                                    ${
                                                        current
                                                            ? "bg-slate-900 text-white"
                                                            : unlocked
                                                              ? "bg-green-500/10"
                                                              : "bg-white/5"
                                                    }
                                                `}
                                            >
                                                {unlocked ? (
                                                    <FaTree className="text-emerald-400" />
                                                ) : (
                                                    <FaLock className="text-white/30" />
                                                )}
                                            </div>

                                            {/* Info */}

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-xl font-bold">{map.name}</h2>

                                                    {current && (
                                                        <span
                                                            className="
                                                                rounded-full
                                                                bg-slate-900
                                                                px-2
                                                                py-1
                                                                text-[10px]
                                                                font-bold
                                                                uppercase
                                                                tracking-wider
                                                                text-white
                                                            "
                                                        >
                                                            Current
                                                        </span>
                                                    )}
                                                </div>

                                                <p
                                                    className={`
                                                        mt-1
                                                        text-sm
                                                        ${current ? "text-slate-500" : "text-white/50"}
                                                    `}
                                                >
                                                    {map.description}
                                                </p>
                                            </div>

                                            {/* Arrow */}

                                            <div
                                                className={`
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                text-xl

                                                ${
                                                    current
                                                        ? "bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/20"
                                                        : unlocked
                                                          ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/10"
                                                          : "bg-white/5 text-white/30"
                                                }
                                            `}
                                            >
                                                {unlocked ? <FaTree /> : <FaLock />}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
