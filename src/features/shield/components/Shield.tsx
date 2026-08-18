import type { Shield as ShieldModel } from "../models/Shield";
import { BALLOON_SIZE, SHIELD_SCALE } from "../constants/game";

interface ShieldProps {
    shield: ShieldModel;
}

function Shield({ shield }: ShieldProps) {
    const diameter = BALLOON_SIZE * SHIELD_SCALE;
    const radius = diameter / 2;

    return (
        <div
            className="pointer-events-none absolute"
            style={{
                width: diameter,
                height: diameter,
                left: shield.x - radius,
                top: shield.y - radius,
            }}
        >
            <svg
                viewBox="0 0 100 100"
                className="h-full w-full overflow-visible"
            >
                <defs>
                    <filter
                        id="hand-shadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feDropShadow
                            dx="0"
                            dy="3"
                            stdDeviation="2"
                            floodColor="#000"
                            floodOpacity="0.18"
                        />
                    </filter>
                </defs>

                <path
                    d="
                        M 35 88

                        C 28 86, 24 81, 25 75
                        C 26 70, 30 67, 35 67

                        L 35 31
                        C 35 27, 38 24, 42 24
                        C 46 24, 49 27, 49 31
                        L 49 52

                        L 51 22
                        C 51 18, 54 15, 58 15
                        C 62 15, 65 18, 65 22
                        L 65 51

                        L 67 27
                        C 67 23, 70 20, 74 20
                        C 78 20, 81 23, 81 27
                        L 81 54

                        L 82 36
                        C 82 32, 85 30, 88 31
                        C 92 32, 94 35, 93 39

                        L 91 63
                        C 91 72, 88 79, 82 84
                        C 77 89, 70 91, 62 91

                        L 44 91
                        C 40 91, 37 90, 35 88

                        Z
                    "
                    fill="#ffffff"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    filter="url(#hand-shadow)"
                />

                {/* Thumb */}
                <path
                    d="
                        M 36 69
                        C 31 67, 27 69, 25 73
                        C 22 78, 25 83, 30 84
                        C 35 85, 39 81, 40 76
                    "
                    fill="#ffffff"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Palm highlight */}
                <path
                    d="
                        M 43 68
                        C 47 73, 54 76, 62 76
                    "
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default Shield;