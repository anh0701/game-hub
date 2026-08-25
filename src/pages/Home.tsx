import { useNavigate } from "react-router-dom";

import { gameMaps } from "../adventure/data/maps";
import { loadProgress } from "../adventure/managers/ProgressManager";

import { FaArrowRight, FaCheck, FaHashtag, FaLock, FaPuzzlePiece } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";

export default function Home() {
    const navigate = useNavigate();

    const progress = loadProgress();

    const currentMap = gameMaps.find((map) => map.id === progress.currentMapId);

    const currentMission = progress.currentMission;

    const isNewPlayer = progress.completedMissionIds.length === 0 && progress.rescuedFriendIds.length === 0;

    const hasCurrentMission = Boolean(currentMission);

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
                <header>
                    <h1 className="text-3xl font-bold">Cat's Adventure</h1>

                    <p className="mt-2 text-white/50">Your journey to find your friends.</p>
                </header>

                <section className="mt-8">
                    <div
                        className="
                            rounded-2xl
                            bg-white/5
                            p-6
                            ring-1
                            ring-white/10
                        "
                    >
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-widest
                                text-white/40
                            "
                        >
                            {isNewPlayer
                                ? "Your Adventure Begins"
                                : hasCurrentMission
                                  ? "Current Adventure"
                                  : "Adventure Continues"}
                        </p>

                        {isNewPlayer && (
                            <>
                                <h2 className="mt-2 text-2xl font-bold">The Lost Friend</h2>

                                <p className="mt-3 max-w-2xl leading-7 text-white/50">
                                    Your friend has disappeared into a mysterious world. Begin your journey and bring
                                    them home.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/world")}
                                    className="
                                        mt-6
                                        rounded-xl
                                        bg-white
                                        px-5
                                        py-3
                                        font-semibold
                                        text-slate-900
                                        transition
                                        hover:bg-white/90
                                    "
                                >
                                    Begin Adventure
                                </button>
                            </>
                        )}

                        {!isNewPlayer && currentMission && (
                            <>
                                <h2 className="mt-2 text-2xl font-bold">{currentMap?.name}</h2>

                                <p className="mt-3 text-white/50">{currentMission.title}</p>

                                <p className="mt-1 text-sm text-white/40">{currentMission.description}</p>

                                <button
                                    type="button"
                                    onClick={() => navigate(`/adventure/${currentMap?.id}`)}
                                    className="
                                            mt-6
                                            rounded-xl
                                            bg-white
                                            px-5
                                            py-3
                                            font-semibold
                                            text-slate-900
                                            transition
                                            hover:bg-white/90
                                        "
                                >
                                    Continue Adventure
                                </button>
                            </>
                        )}

                        {!isNewPlayer && !hasCurrentMission && (
                            <>
                                <h2 className="mt-2 text-2xl font-bold">The journey continues</h2>

                                <p className="mt-3 max-w-2xl text-white/50">
                                    A new world awaits. Choose your next destination and continue your adventure.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/world")}
                                    className="
                                            mt-6
                                            rounded-xl
                                            bg-white
                                            px-5
                                            py-3
                                            font-semibold
                                            text-slate-900
                                            transition
                                            hover:bg-white/90
                                        "
                                >
                                    Explore World
                                </button>
                            </>
                        )}
                    </div>
                </section>

                <section className="mt-6">
                    <h2 className="text-lg font-bold">Your Journey</h2>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <ProgressCard label="Maps" value={progress.unlockedMapIds.length} />

                        <ProgressCard label="Friends" value={progress.rescuedFriendIds.length} />

                        <ProgressCard label="Missions" value={progress.completedMissionIds.length} />
                    </div>
                </section>

                <section className="mt-10">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Adventure Progress</h2>

                            <p className="mt-1 text-sm text-white/40">Your journey through the worlds.</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/world")}
                            className="
                            flex
                            items-center
                            gap-1
                            text-sm
                            text-white/40
                            transition
                            hover:text-white
                        "
                        >
                            View Map
                            <FaArrowRight className="text-xs" />
                        </button>
                    </div>

                    <div
                        className="
                            mt-4
                            rounded-2xl
                            bg-white/5
                            p-5
                            ring-1
                            ring-white/10
                        "
                    >
                        {gameMaps.map((map, index) => {
                            const unlocked = progress.unlockedMapIds.includes(map.id);

                            const current = progress.currentMapId === map.id;

                            return (
                                <div
                                    key={map.id}
                                    className="
                                            flex
                                            gap-4
                                        "
                                >
                                    {/* STATUS */}

                                    <div
                                        className="
                                                flex
                                                flex-col
                                                items-center
                                            "
                                    >
                                        <div
                                            className={`
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    text-sm

                                                    ${
                                                        current
                                                            ? "bg-white text-slate-900"
                                                            : unlocked
                                                              ? "bg-green-500/20 text-green-400"
                                                              : "bg-white/10 text-white/30"
                                                    }
                                                `}
                                        >
                                            {current ? <FaArrowRight /> : unlocked ? <FaCheck /> : <FaLock />}
                                        </div>

                                        {index < gameMaps.length - 1 && (
                                            <div
                                                className="
                                                        h-8
                                                        w-px
                                                        bg-white/10
                                                    "
                                            />
                                        )}
                                    </div>

                                    {/* INFO */}

                                    <div className="pb-6">
                                        <p className="font-semibold">{map.name}</p>

                                        <p className="mt-1 text-sm text-white/40">
                                            {current ? "Current destination" : unlocked ? "World unlocked" : "Locked"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Challenges</h2>

                    <p className="mt-1 text-sm text-white/40">Complete challenges to progress.</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <GameCard
                            icon={<FaPuzzlePiece className="text-violet-400" />}
                            title="Block Blast"
                            onClick={() => navigate("/block")}
                        />

                        <GameCard
                            icon={<FaHashtag className="text-blue-400" />}
                            title="Sudoku"
                            onClick={() => navigate("/sudoku")}
                        />

                        <GameCard
                            icon={<FaShieldHalved className="text-emerald-400" />}
                            title="Shield"
                            onClick={() => navigate("/shield")}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

function ProgressCard({ label, value }: { label: string; value: number }) {
    return (
        <div
            className="
                rounded-xl
                bg-white/5
                p-4
                ring-1
                ring-white/10
            "
        >
            <div className="text-sm text-white/40">{label}</div>

            <div className="mt-1 text-2xl font-bold">{value}</div>
        </div>
    );
}

function GameCard({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                rounded-xl
                bg-white/5
                p-5
                text-left
                ring-1
                ring-white/10
                transition
                hover:-translate-y-0.5
                hover:bg-white/10
                hover:ring-white/20
                active:scale-[0.98]
            "
        >
            <div
                className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/5
                    text-xl
                    ring-1
                    ring-white/10
                    transition
                    group-hover:bg-white/10
                "
            >
                {icon}
            </div>

            <div className="mt-4 font-semibold">{title}</div>

            <div className="mt-1 text-sm text-white/40">Play challenge</div>
        </button>
    );
}
