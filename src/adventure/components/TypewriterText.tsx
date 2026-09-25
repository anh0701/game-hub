import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export function TypewriterText({ text, speed = 35, onComplete }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");

        let index = 0;

        const interval = window.setInterval(() => {
            index += 1;

            setDisplayedText(text.slice(0, index));

            if (index >= text.length) {
                window.clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => {
            window.clearInterval(interval);
        };
    }, [text, speed, onComplete]);

    return <>{displayedText}</>;
}
