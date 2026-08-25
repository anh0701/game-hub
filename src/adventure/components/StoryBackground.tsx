interface StoryBackgroundProps {
    mapId: string;
}

export function StoryBackground({ mapId }: StoryBackgroundProps) {
    if (mapId === "block-world") {
        return <BlockWorldBackground />;
    }

    return <DefaultBackground />;
}

function BlockWorldBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Sky */}

            <div
                className="
                    absolute
                    inset-0
                    bg-[linear-gradient(to_bottom,#7dd3fc_0%,#bae6fd_52%,#86efac_52%,#4ade80_100%)]
                "
            />

            {/* Sun */}

            <div
                className="
                    absolute
                    right-[12%]
                    top-[10%]
                    h-24
                    w-24
                    rounded-full
                    bg-yellow-200
                    opacity-80
                    blur-sm
                "
            />

            {/* Distant blocks */}

            <div className="absolute bottom-[35%] left-[8%] h-20 w-20 bg-slate-500/40" />

            <div className="absolute bottom-[32%] left-[18%] h-12 w-12 bg-slate-600/40" />

            <div className="absolute bottom-[38%] right-[18%] h-24 w-24 bg-slate-500/40" />

            <div className="absolute bottom-[30%] right-[8%] h-14 w-14 bg-slate-600/40" />

            {/* Ground */}

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    h-[35%]
                    w-full
                    bg-emerald-400
                "
            />

            {/* Grass blocks */}

            <div className="absolute bottom-[35%] left-[5%] h-8 w-16 bg-emerald-300" />

            <div className="absolute bottom-[35%] left-[28%] h-6 w-12 bg-emerald-300" />

            <div className="absolute bottom-[35%] right-[25%] h-7 w-16 bg-emerald-300" />

            <div className="absolute bottom-[35%] right-[5%] h-5 w-10 bg-emerald-300" />

            {/* Floating blocks */}

            <div
                className="
                    absolute
                    left-[25%]
                    top-[25%]
                    h-10
                    w-10
                    rotate-6
                    bg-white/20
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    right-[30%]
                    top-[35%]
                    h-6
                    w-6
                    -rotate-12
                    bg-white/20
                    animate-pulse
                "
            />
        </div>
    );
}

function DefaultBackground() {
    return (
        <div
            className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top,#334155,#020617_70%)]
            "
        />
    );
}
