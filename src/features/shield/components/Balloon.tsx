import type { Balloon as BalloonModel } from "../models/Balloon";

interface BalloonProps {
    balloon: BalloonModel;
}

const WIDTH = 56;
const HEIGHT = 68;

function Balloon({ balloon }: BalloonProps) {
    return (
        <div
            className="absolute"
            style={{
                left: balloon.x,
                top: balloon.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* Balloon */}
            <div
                className="rounded-[50%] border-2 border-pink-500 bg-pink-400 shadow-lg"
                style={{
                    width: WIDTH,
                    height: HEIGHT,
                }}
            />

            {/* Knot */}
            <div className="mx-auto -mt-1 h-3 w-3 rotate-45 bg-pink-500" />

            {/* Rope */}
            <div className="mx-auto h-16 w-0.5 bg-gray-600" />

            {/* Flower */}
            <div className="absolute left-1/2 top-11 -translate-x-1/2">
                <div className="relative h-8 w-8">
                    <div className="absolute left-3 top-0 h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="absolute left-0 top-3 h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="absolute left-6 top-3 h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="absolute left-3 top-6 h-3 w-3 rounded-full bg-yellow-300" />

                    <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-green-500" />
                </div>
            </div>
        </div>
    );
}

export default Balloon;
