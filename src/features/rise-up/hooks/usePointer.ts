import { useCallback, useEffect, useState } from "react";

interface PointerPosition {
    x: number;
    y: number;
}

export function usePointer() {
    const [pointer, setPointer] = useState<PointerPosition>({
        x: 0,
        y: 0,
    });

    const updatePointer = useCallback((event: PointerEvent) => {
        setPointer({
            x: event.clientX,
            y: event.clientY,
        });
    }, []);

    useEffect(() => {
        window.addEventListener("pointermove", updatePointer);

        window.addEventListener("pointerdown", updatePointer);

        return () => {
            window.removeEventListener("pointermove", updatePointer);

            window.removeEventListener("pointerdown", updatePointer);
        };
    }, [updatePointer]);

    return pointer;
}
