import { useState } from "react";

import type { Character } from "../models/Character";
import type { GameResult } from "../models/GameResult";
import type { AdventureSessionState } from "../managers/AdventureSession";

import { completeStory, finishAdventureSession } from "../managers/AdventureSession";

import { getCharacter } from "../managers/CharacterManager";

import { StoryDialog } from "./StoryDialog";
import { GameLauncher } from "./GameLauncher";

import { FaArrowLeft, FaPlay, FaTrophy } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import { gameMaps } from "../data/maps";

type AdventurePhase = "story" | "mission" | "game" | "complete";

interface AdventureScreenProps {
    session: AdventureSessionState;
    onExit?: () => void;
}

export function AdventureScreen({ session, onExit }: AdventureScreenProps) {
    const [phase, setPhase] = useState<AdventurePhase>(session.story ? "story" : "mission");

    const [activeStory, setActiveStory] = useState(session.story);

    const [rescuedFriend, setRescuedFriend] = useState<Character | undefined>();

    const [isReplay, setIsReplay] = useState(false);

    const map = getMap(session.mapId);

    const targetFriend = map?.friendId ? getCharacter(map.friendId) : undefined;

    function handleStoryComplete() {
        if (!activeStory) {
            setPhase("mission");
            return;
        }

        completeStory(activeStory.id);

        const completedStory = activeStory;

        if (completedStory.trigger === "beforeMission") {
            setActiveStory(undefined);
            setPhase("mission");
            return;
        }

        if (completedStory.trigger === "afterMission") {
            setActiveStory(undefined);
            setPhase("complete");
            return;
        }

        setActiveStory(undefined);
        setPhase("mission");
    }

    function handleMissionStart() {
        setPhase("game");
    }

    function handleGameComplete(result: GameResult) {
        console.log("🔥 HANDLE GAME COMPLETE CALLED");
        console.log("RESULT:", result);

        const adventureResult = finishAdventureSession(result);

        console.log("🔥 ADVENTURE RESULT:", adventureResult);

        if (!adventureResult.missionCompleted) {
            setPhase("mission");
            return;
        }

        if (adventureResult.rescuedFriendId) {
            const friend = getCharacter(adventureResult.rescuedFriendId);

            console.log("🔥 RESCUED FRIEND ID:", adventureResult.rescuedFriendId);

            console.log("🔥 RESCUED FRIEND:", friend);

            setRescuedFriend(friend);

            // First-time rescue
            setIsReplay(false);
        } else {
            setRescuedFriend(undefined);

            setIsReplay(true);
        }

        if (adventureResult.story) {
            setActiveStory(adventureResult.story);
            setPhase("story");
            return;
        }

        setPhase("complete");
    }

    if (phase === "story" && activeStory) {
        return <StoryDialog story={activeStory} onComplete={handleStoryComplete} />;
    }

    if (phase === "game") {
        return (
            <GameLauncher
                gameMode={session.mission.gameMode}
                target={session.mission.target}
                onComplete={handleGameComplete}
            />
        );
    }

    if (phase === "complete") {
        return (
            <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
                <div className="mx-auto max-w-2xl">
                    {/* Back */}
                    {onExit && (
                        <button
                            type="button"
                            onClick={onExit}
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-white/40
                                transition
                                hover:text-cyan-400
                            "
                        >
                            <FaArrowLeft className="text-cyan-400" />
                            Adventure Map
                        </button>
                    )}

                    {isReplay ? (
                        <>
                            {/* Success */}
                            <section className="pt-10 text-center">
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-cyan-400/10
                                        text-4xl
                                        text-cyan-400
                                        ring-1
                                        ring-cyan-400/20
                                    "
                                >
                                    <FaStar />
                                </div>

                                <p
                                    className="
                                        mt-6
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-widest
                                        text-white/40
                                    "
                                >
                                    Great Job
                                </p>

                                <h1 className="mt-2 text-4xl font-bold">You're Getting Better!</h1>

                                <p className="mx-auto mt-3 max-w-lg leading-7 text-white/50">
                                    You have already rescued your friend, but every challenge makes you smarter, faster,
                                    and more prepared.
                                </p>
                            </section>

                            {/* Encouragement */}
                            <section
                                className="
                                    mt-8
                                    rounded-2xl
                                    bg-white/5
                                    p-6
                                    text-center
                                    ring-1
                                    ring-white/10
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-amber-400/10
                                        text-3xl
                                        text-amber-400
                                        ring-1
                                        ring-amber-400/20
                                    "
                                >
                                    <FaStar />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold">Keep Training</h2>

                                <p className="mt-3 leading-7 text-white/50">
                                    The next time a friend needs your help, you'll be ready to rescue them even faster.
                                </p>

                                <p className="mt-3 leading-7 text-cyan-400/80">
                                    Every game makes you a better adventurer.
                                </p>
                            </section>

                            {/* Current World */}
                            <section
                                className="
                                    mt-8
                                    rounded-2xl
                                    bg-white/5
                                    p-6
                                    text-center
                                    ring-1
                                    ring-white/10
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-emerald-400/10
                                        text-3xl
                                        text-emerald-400
                                        ring-1
                                        ring-emerald-400/20
                                    "
                                >
                                    <FaTrophy />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold">{getMapName(session.mapId)}</h2>

                                <p className="mt-2 text-white/50">Keep exploring. Your next adventure is waiting.</p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section className="pt-10 text-center">
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-emerald-400/10
                                        text-4xl
                                        text-emerald-400
                                        ring-1
                                        ring-emerald-400/20
                                    "
                                >
                                    <FaTrophy />
                                </div>

                                <p
                                    className="
                                        mt-6
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-widest
                                        text-white/40
                                    "
                                >
                                    Mission Complete
                                </p>

                                <h1 className="mt-2 text-4xl font-bold">Adventure Complete</h1>

                                <p className="mt-3 text-white/50">You completed the mission and rescued your friend.</p>
                            </section>

                            {/* Rescued Friend */}
                            {rescuedFriend && (
                                <section
                                    className="
                                        mt-8
                                        rounded-2xl
                                        bg-white/5
                                        p-6
                                        text-center
                                        ring-1
                                        ring-white/10
                                    "
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}${rescuedFriend.image.replace(/^\/+/, "")}`}
                                        alt={rescuedFriend.name}
                                        className="
                                            mx-auto
                                            h-28
                                            w-28
                                            object-contain
                                        "
                                    />

                                    <p
                                        className="
                                            mt-4
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-widest
                                            text-emerald-400
                                        "
                                    >
                                        Friend Rescued
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold">{rescuedFriend.name}</h2>

                                    <p className="mt-2 text-white/50">{rescuedFriend.name} is safe now.</p>
                                </section>
                            )}

                            {/* Result */}
                            <section
                                className="
                                    mt-8
                                    rounded-2xl
                                    bg-white/5
                                    p-6
                                    text-center
                                    ring-1
                                    ring-white/10
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-amber-400/10
                                        text-3xl
                                        text-amber-400
                                        ring-1
                                        ring-amber-400/20
                                    "
                                >
                                    <FaStar />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold">{getMapName(session.mapId)}</h2>

                                <p className="mt-2 text-white/50">The adventure continues.</p>
                            </section>
                        </>
                    )}

                    {/* Back to Map */}
                    {onExit && (
                        <button
                            type="button"
                            onClick={onExit}
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-white
                                px-5
                                py-3
                                font-semibold
                                text-slate-900
                                transition
                                hover:bg-white/90
                                active:scale-[0.98]
                            "
                        >
                            Back to Adventure Map
                        </button>
                    )}
                </div>
            </main>
        );
    }

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
            <div className="mx-auto max-w-2xl">
                {/* Back */}
                {onExit && (
                    <button
                        type="button"
                        onClick={onExit}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-white/40
                            transition
                            hover:text-cyan-400
                        "
                    >
                        <FaArrowLeft className="text-cyan-400" />
                        Adventure Map
                    </button>
                )}

                {/* MAP */}
                <section className="mt-8">
                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            text-white/40
                        "
                    >
                        Adventure
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">{getMapName(session.mapId)}</h1>

                    <p className="mt-3 leading-7 text-white/50">{getMapDescription(session.mapId)}</p>

                    {targetFriend && (
                        <section
                            className="
                                mt-6
                                rounded-2xl
                                bg-white/5
                                p-5
                                ring-1
                                ring-white/10
                            "
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${import.meta.env.BASE_URL}${targetFriend.image.replace(/^\/+/, "")}`}
                                    alt={targetFriend.name}
                                    className="
                                        h-20
                                        w-20
                                        shrink-0
                                        object-contain
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-widest
                                            text-red-400
                                        "
                                    >
                                        Friend in Danger
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold">{targetFriend.name}</h2>

                                    <p className="mt-1 text-sm text-white/50">Rescue your friend from this world.</p>
                                </div>
                            </div>
                        </section>
                    )}
                </section>

                {/* MISSION */}
                <section className="mt-8">
                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            text-white/40
                        "
                    >
                        Mission
                    </p>

                    <div
                        className="
                            mt-3
                            rounded-2xl
                            bg-white
                            p-6
                            text-slate-900
                        "
                    >
                        <h2 className="text-2xl font-bold">{session.mission.title}</h2>

                        <p className="mt-2 text-slate-500">{session.mission.description}</p>

                        {/* OBJECTIVE */}
                        <div
                            className="
                                mt-6
                                rounded-xl
                                bg-slate-100
                                p-4
                            "
                        >
                            <p className="text-sm text-slate-500">Your objective</p>

                            <p className="mt-1 text-xl font-bold">{getMissionTargetText(session.mission)}</p>
                        </div>

                        {/* TAGS */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span
                                className="
                                    rounded-lg
                                    bg-slate-100
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    uppercase
                                "
                            >
                                {session.mission.difficulty}
                            </span>

                            <span
                                className="
                                    rounded-lg
                                    bg-slate-100
                                    px-3
                                    py-1.5
                                    text-xs
                                "
                            >
                                {session.mission.gameMode}
                            </span>
                        </div>

                        {/* START */}
                        <button
                            type="button"
                            onClick={handleMissionStart}
                            className="
                                mt-6
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-slate-950
                                px-5
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-slate-800
                                active:scale-[0.98]
                            "
                        >
                            <FaPlay className="text-blue-400" />
                            Start Mission
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}

function getMap(mapId: string) {
    return gameMaps.find((map) => map.id === mapId);
}

function getMapName(mapId: string): string {
    return getMap(mapId)?.name ?? mapId;
}

function getMapDescription(mapId: string): string {
    return getMap(mapId)?.description ?? "Explore this mysterious world and rescue your friend.";
}

function getMissionTargetText(mission: { target: number; gameMode: string }): string {
    if (mission.gameMode === "block-free") {
        return `Reach ${mission.target.toLocaleString()} points`;
    }

    if (mission.gameMode === "block-level") {
        return `Reach Level ${mission.target}`;
    }

    if (mission.gameMode === "sudoku") {
        return `Solve ${mission.target} Sudoku boards`;
    }

    if (mission.gameMode === "shield") {
        return `Reach ${mission.target.toLocaleString()} points`;
    }

    return `Complete the objective (${mission.target})`;
}
