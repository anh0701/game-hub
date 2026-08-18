import { useEffect, useRef } from "react";

type UpdateFunction = (deltaTime: number) => void;

export function useGameLoop(update: UpdateFunction) {
    const lastTime = useRef(0);

    useEffect(() => {
        let animationId: number;

        const loop = (currentTime: number) => {
            if (lastTime.current === 0) {
                lastTime.current = currentTime;
            }

            const deltaTime = Math.min(
                (currentTime - lastTime.current) / 1000,
                0.033
            );

            lastTime.current = currentTime;

            update(deltaTime);

            animationId = requestAnimationFrame(loop);
        };

        animationId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationId);
    }, [update]);
}