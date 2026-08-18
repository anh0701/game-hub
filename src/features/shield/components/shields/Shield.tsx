import type { Shield as ShieldModel } from "../../models/Shield";
import type { ShieldType } from "../../models/GameSetup";

import { BALLOON_SIZE, SHIELD_SCALE } from "../../constants/game";

import HandShield from "./HandShield";
import CircleShield from "./CircleShield";
import StarShield from "./StarShield";

interface ShieldProps {
    shield: ShieldModel;

    type?: ShieldType;

    color?: string;
}

function Shield({ shield, type = "hand", color = "#ffffff" }: ShieldProps) {
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
            {type === "hand" && <HandShield size={diameter} color={color} />}

            {type === "circle" && <CircleShield size={diameter} color={color} />}

            {type === "star" && <StarShield size={diameter} color={color} />}
        </div>
    );
}

export default Shield;
