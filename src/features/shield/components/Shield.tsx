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
            className="absolute rounded-full border-4 border-white bg-white/30 shadow-lg"
            style={{
                width: diameter,
                height: diameter,
                left: shield.x - radius,
                top: shield.y - radius,
            }}
        />
    );
}

export default Shield;
