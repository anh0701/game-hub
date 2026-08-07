interface ShieldProps {

    x: number;

    y: number;

    radius: number;

}

function Shield({ x, y, radius }: ShieldProps) {

    return (

        <div
            className="absolute rounded-full border-4 border-white bg-white/20"
            style={{
                width: radius * 2,
                height: radius * 2,
                left: x - radius,
                top: y - radius,
            }}
        />

    );

}

export default Shield;