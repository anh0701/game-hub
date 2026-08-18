interface HandShieldProps {
    size?: number;
    color?: string;
}

function HandShield({ size = 80, color = "#F5B97A" }: HandShieldProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{
                filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.18))",
            }}
        >
            <path
                d="
                    M34 88

                    C28 85 25 81 26 76
                    C27 71 30 68 35 68

                    L35 32
                    C35 28 38 25 42 25
                    C46 25 49 28 49 32
                    L49 52

                    L51 22
                    C51 18 54 15 58 15
                    C62 15 65 18 65 22
                    L65 51

                    L67 28
                    C67 24 70 21 74 21
                    C78 21 81 24 81 28
                    L81 54

                    L82 37
                    C82 33 85 31 88 32
                    C92 33 94 36 93 40

                    L91 63

                    C91 72 88 79 82 84
                    C77 89 70 91 62 91

                    L44 91

                    C40 91 37 90 34 88

                    Z
                "
                fill={color}
                stroke="#FFF4E8"
                strokeWidth="4"
                strokeLinejoin="round"
            />

            {/* Palm highlight */}
            <path
                d="M43 68 C48 73 55 76 62 76"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default HandShield;
