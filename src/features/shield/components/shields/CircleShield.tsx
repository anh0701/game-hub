interface CircleShieldProps {
    size?: number;
    color?: string;
}

function CircleShield({ size = 80, color = "#ffffff" }: CircleShieldProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color,
                border: "4px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
            }}
        />
    );
}

export default CircleShield;
