interface SunflowerProps {
    x: number;
    y: number;
}

function Sunflower({ x, y }: SunflowerProps) {
    return (
        <svg
            className="absolute"
            width="82"
            height="65"
            viewBox="0 0 82 65"
            style={{
                left: x,
                top: y,
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* OUTER PETALS */}
            <g fill="#F9B91F">
                <ellipse cx="41" cy="14" rx="7" ry="14" />
                <ellipse cx="57" cy="20" rx="7" ry="14" transform="rotate(42 57 20)" />
                <ellipse cx="66" cy="35" rx="7" ry="14" transform="rotate(82 66 35)" />
                <ellipse cx="59" cy="50" rx="7" ry="14" transform="rotate(132 59 50)" />
                <ellipse cx="42" cy="57" rx="7" ry="14" />
                <ellipse cx="24" cy="50" rx="7" ry="14" transform="rotate(-132 24 50)" />
                <ellipse cx="16" cy="35" rx="7" ry="14" transform="rotate(-82 16 35)" />
                <ellipse cx="25" cy="20" rx="7" ry="14" transform="rotate(-42 25 20)" />
            </g>

            {/* INNER PETALS */}
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

            {/* CENTER */}
            <circle cx="41" cy="35" r="13" fill="#704018" />
            <circle cx="37" cy="31" r="2" fill="#8F5425" />

            {/* SEEDS */}
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
    );
}

export default Sunflower;
