interface MeteorObstacleProps {
    size?: number;
    color?: string;
}

function MeteorObstacle({ size = 70, color = "#f97316" }: MeteorObstacleProps) {
    return (
        <div
            className="relative"
            style={{
                width: size,
                height: size,
            }}
        >
            {/* Fire trail */}
            <div
                className="absolute left-1/2 top-[65%] h-[45%] w-[25%] -translate-x-1/2 rounded-full opacity-70"
                style={{
                    backgroundColor: "#facc15",
                }}
            />

            {/* Meteor */}
            <div
                className="absolute inset-[10%] rounded-full border-4 border-red-900/40 shadow-lg"
                style={{
                    backgroundColor: color,
                }}
            />

            {/* Craters */}
            <div className="absolute left-[25%] top-[30%] h-[15%] w-[15%] rounded-full bg-red-900/30" />

            <div className="absolute right-[25%] top-[50%] h-[20%] w-[20%] rounded-full bg-red-900/30" />
        </div>
    );
}

export default MeteorObstacle;
