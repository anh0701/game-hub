import type { Shield as ShieldModel } from "../models/Shield";

interface ShieldProps {
    shield: ShieldModel;
}

function Shield({ shield }: ShieldProps) {
    const diameter = shield.radius * 2;

    return (
        <div
            className="absolute rounded-full border-4 border-white bg-white/30 shadow-lg"
            style={{
                width: diameter,
                height: diameter,
                left: shield.x - shield.radius,
                top: shield.y - shield.radius,
            }}
        />
    );
}

export default Shield;
