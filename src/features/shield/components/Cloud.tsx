import type { Cloud as CloudModel } from "../models/Cloud";

interface CloudProps {
    cloud: CloudModel;
    cameraY: number;
}

function Cloud({ cloud, cameraY }: CloudProps) {
    const screenY = cloud.y + cameraY;

    return (
        <div
            className="pointer-events-none absolute"
            style={{
                left: cloud.x,
                top: screenY,

                width: cloud.size,
                height: cloud.size * 0.55,

                transform: "translate(-50%, -50%)",

                opacity: 0.8,

                zIndex: 1,
            }}
        >
            <div className="relative h-full w-full">
                <div
                    className="absolute bottom-0 left-0 rounded-full bg-white"
                    style={{
                        width: cloud.size * 0.65,

                        height: cloud.size * 0.35,
                    }}
                />

                <div
                    className="absolute bottom-0 left-[25%] rounded-full bg-white"
                    style={{
                        width: cloud.size * 0.45,

                        height: cloud.size * 0.45,
                    }}
                />

                <div
                    className="absolute bottom-0 right-0 rounded-full bg-white"
                    style={{
                        width: cloud.size * 0.55,

                        height: cloud.size * 0.32,
                    }}
                />

                <div
                    className="absolute left-[42%] top-0 rounded-full bg-white"
                    style={{
                        width: cloud.size * 0.35,

                        height: cloud.size * 0.35,
                    }}
                />
            </div>
        </div>
    );
}

export default Cloud;
