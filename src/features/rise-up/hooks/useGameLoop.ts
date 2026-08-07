import { useEffect, useRef } from "react";

type UpdateFunction = (deltaTime: number) => void;

export function useGameLoop(update: UpdateFunction) {
    const lastTime = useRef(0);

    useEffect(() => {
        let animationId: number;

        const loop = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime.current) / 1000;
            lastTime.current = currentTime;

            update(deltaTime);

            animationId = requestAnimationFrame(loop);
        };

        animationId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationId);
    }, [update]);
}
