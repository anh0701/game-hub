interface StarShieldProps {
    size?: number;
    color?: string;
}

function StarShield({ size = 80, color = "#ffffff" }: StarShieldProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{
                filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.18))",
            }}
        >
            <polygon
                points="
                    50,5
                    61,36
                    95,36
                    68,55
                    78,88
                    50,68
                    22,88
                    32,55
                    5,36
                    39,36
                "
                fill={color}
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="4"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default StarShield;
