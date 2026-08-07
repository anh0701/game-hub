import { useEffect, useRef, useState } from "react";

export function useBoardSize<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const updateSize = () => {
            setSize({
                width: element.clientWidth,
                height: element.clientHeight,
            });
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return {
        ref,
        size,
    };
}