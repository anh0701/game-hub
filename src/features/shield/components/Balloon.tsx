import { BALLOON_SIZE } from "../constants/game";
import type { Balloon as BalloonModel } from "../models/Balloon";

interface BalloonProps {
    balloon: BalloonModel;
}

const WIDTH = BALLOON_SIZE;
const HEIGHT = 108;

function Balloon({ balloon }: BalloonProps) {
    return (
        <div
            className="absolute"
            style={{
                left: balloon.x,
                top: balloon.y,
                width: WIDTH,
                height: HEIGHT,
                transform: "translate(-50%, -50%)",
            }}
        >
            <svg width="82" height="108" viewBox="0 0 82 108" xmlns="http://www.w3.org/2000/svg">
                {/* =========================
                    STEM
                ========================= */}
                <path
                    d="M41 61 C40 72 40 88 40 103"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* =========================
                    LEFT LEAF
                ========================= */}
                <path
                    d="
                        M40 78
                        C32 72 23 72 17 76
                        C23 82 31 83 40 80
                        Z
                    "
                    fill="#42A947"
                />

                {/* Leaf vein */}
                <path
                    d="M39 79 C31 77 25 77 19 77"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* =========================
                    RIGHT LEAF
                ========================= */}
                <path
                    d="
                        M40 88
                        C49 82 58 83 64 87
                        C58 93 49 94 40 91
                        Z
                    "
                    fill="#42A947"
                />

                {/* Leaf vein */}
                <path
                    d="M42 89 C50 87 56 87 62 88"
                    fill="none"
                    stroke="#2F8F3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* =========================
                    OUTER PETALS
                ========================= */}
                <g fill="#F9B91F">
                    {/* Top */}
                    <ellipse cx="41" cy="14" rx="7" ry="14" />

                    {/* Top-right */}
                    <ellipse cx="57" cy="20" rx="7" ry="14" transform="rotate(42 57 20)" />

                    {/* Right */}
                    <ellipse cx="66" cy="35" rx="7" ry="14" transform="rotate(82 66 35)" />

                    {/* Bottom-right */}
                    <ellipse cx="59" cy="50" rx="7" ry="14" transform="rotate(132 59 50)" />

                    {/* Bottom */}
                    <ellipse cx="42" cy="57" rx="7" ry="14" />

                    {/* Bottom-left */}
                    <ellipse cx="24" cy="50" rx="7" ry="14" transform="rotate(-132 24 50)" />

                    {/* Left */}
                    <ellipse cx="16" cy="35" rx="7" ry="14" transform="rotate(-82 16 35)" />

                    {/* Top-left */}
                    <ellipse cx="25" cy="20" rx="7" ry="14" transform="rotate(-42 25 20)" />
                </g>

                {/* =========================
                    INNER PETALS
                ========================= */}
                <g fill="#FFD447">
                    <ellipse cx="41" cy="20" rx="5" ry="11" />

                    <ellipse cx="53" cy="25" rx="5" ry="11" transform="rotate(45 53 25)" />

                    <ellipse cx="57" cy="37" rx="5" ry="11" transform="rotate(90 57 37)" />

                    <ellipse cx="51" cy="48" rx="5" ry="11" transform="rotate(135 51 48)" />

                    <ellipse cx="41" cy="50" rx="5" ry="11" />

                    <ellipse cx="30" cy="47" rx="5" ry="11" transform="rotate(-135 30 47)" />

                    <ellipse cx="25" cy="36" rx="5" ry="11" transform="rotate(-90 25 36)" />

                    <ellipse cx="30" cy="25" rx="5" ry="11" transform="rotate(-45 30 25)" />
                </g>

                {/* =========================
                    FLOWER CENTER
                ========================= */}
                <circle cx="41" cy="35" r="13" fill="#704018" />

                {/* Center highlight */}
                <circle cx="37" cy="31" r="2" fill="#8F5425" />

                {/* Seeds */}
                <g fill="#3B210F">
                    <circle cx="34" cy="27" r="1.8" />
                    <circle cx="41" cy="25" r="1.8" />
                    <circle cx="47" cy="29" r="1.8" />

                    <circle cx="31" cy="34" r="1.8" />
                    <circle cx="38" cy="33" r="1.8" />
                    <circle cx="45" cy="35" r="1.8" />
                    <circle cx="51" cy="34" r="1.8" />

                    <circle cx="34" cy="41" r="1.8" />
                    <circle cx="41" cy="42" r="1.8" />
                    <circle cx="47" cy="41" r="1.8" />
                </g>
            </svg>
        </div>
    );
}

export default Balloon;
