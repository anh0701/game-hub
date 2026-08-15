import type { Balloon as BalloonModel } from "../models/Balloon";
import Sunflower from "./Sunflower";

interface BalloonProps {
    balloon: BalloonModel;
}

const FLOWERS = [
    // Hàng sau
    { x: 55, y: 0 },

    // Hai bên
    { x: 0, y: 18 },
    { x: 110, y: 18 },

    // Hàng trước
    { x: 30, y: 42 },
    { x: 80, y: 42 },
];

function Balloon({ balloon }: BalloonProps) {
    return (
        <div
            className="absolute"
            style={{
                left: balloon.x,
                top: balloon.y,
                width: 192,
                height: 160,
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* =========================
                COMMON STEM
            ========================= */}
            <svg
                className="absolute inset-0 z-0"
                width="192"
                height="160"
                viewBox="0 0 192 160"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Main stem */}
                <path
                    d="M96 150 C96 130 96 110 96 92"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="5"
                    strokeLinecap="round"
                />

                {/* Left branch */}
                <path
                    d="M96 120 C78 105 58 88 41 61"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Right branch */}
                <path
                    d="M96 120 C114 105 134 88 151 61"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Upper-left branch */}
                <path
                    d="M96 105 C88 88 82 70 81 43"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Upper-right branch */}
                <path
                    d="M96 105 C104 88 110 70 111 43"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* =========================
                    LEAVES
                ========================= */}

                {/* Left lower leaf */}
                <path
                    d="
                        M82 124
                        C69 113 55 113 46 119
                        C57 128 70 130 83 127
                        Z
                    "
                    fill="#42A947"
                />

                {/* Left upper leaf */}
                <path
                    d="
                        M70 105
                        C59 97 48 98 41 103
                        C50 111 60 112 71 109
                        Z
                    "
                    fill="#42A947"
                />

                {/* Right lower leaf */}
                <path
                    d="
                        M110 124
                        C123 113 137 113 146 119
                        C135 128 122 130 109 127
                        Z
                    "
                    fill="#42A947"
                />

                {/* Right upper leaf */}
                <path
                    d="
                        M122 105
                        C133 97 144 98 151 103
                        C142 111 132 112 121 109
                        Z
                    "
                    fill="#42A947"
                />

                {/* Small center leaves */}
                <path
                    d="
                        M94 111
                        C84 104 76 105 71 109
                        C79 115 87 116 95 114
                        Z
                    "
                    fill="#42A947"
                />

                <path
                    d="
                        M98 111
                        C108 104 116 105 121 109
                        C113 115 105 116 97 114
                        Z
                    "
                    fill="#42A947"
                />
            </svg>

            {/* =========================
                FLOWER HEADS
            ========================= */}

            {FLOWERS.map((flower, index) => (
                <Sunflower key={index} x={flower.x} y={flower.y} />
            ))}
        </div>
    );
}

export default Balloon;
