interface RockObstacleProps {
    size?: number;
}

function RockObstacle({ size = 70 }: RockObstacleProps) {
    return (
        <div
            className="relative rounded-full border-4 border-gray-700 bg-gray-500 shadow-lg"
            style={{
                width: size,
                height: size,
            }}
        >
            {/* Highlight */}
            <div
                className="absolute rounded-full bg-gray-400"
                style={{
                    width: size * 0.25,
                    height: size * 0.25,
                    left: size * 0.2,
                    top: size * 0.14,
                }}
            />

            {/* Crack */}
            <div className="absolute left-1/2 top-[20%] h-[60%] w-1 -translate-x-1/2 -rotate-12 bg-gray-700" />

            <div className="absolute left-[35%] top-1/2 h-1 w-[45%] -translate-y-1/2 rotate-45 bg-gray-700" />
        </div>
    );
}

export default RockObstacle;
