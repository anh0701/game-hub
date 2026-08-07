interface BalloonProps {
    x: number;
    y: number;
}

const SIZE = 56;

function Balloon({ x, y }: BalloonProps) {
    return (
        <div
            className="absolute"
            style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* Balloon */}
            <div
                className="rounded-full bg-pink-400 border-2 border-pink-500 shadow-lg"
                style={{
                    width: SIZE,
                    height: SIZE * 1.2,
                }}
            />

            {/* Knot */}
            <div
                className="mx-auto h-2 w-2 rotate-45 bg-pink-500"
            />

            {/* Rope */}
            <div
                className="mx-auto h-20 w-0.5 bg-gray-600"
            />

            {/* Flower */}
            {/* <div
                className="absolute left-1/2 top-14 -translate-x-1/2"
            >
                <div className="relative h-8 w-8">
                    <div className="absolute left-3 top-0 h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="absolute left-0 top-3 h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="absolute left-6 top-3 h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="absolute left-3 top-6 h-3 w-3 rounded-full bg-yellow-300" />

                    <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-green-500" />
                </div>
            </div> */}
        </div>
    );
}

export default Balloon;