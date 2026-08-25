import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { startAdventureSession, type AdventureSessionState } from "../adventure/managers/AdventureSession";

import { AdventureScreen } from "../adventure/components/AdventureScreen";

export default function AdventurePage() {
    const { mapId } = useParams();

    const navigate = useNavigate();

    const [session, setSession] = useState<AdventureSessionState | null>(null);

    useEffect(() => {
        if (!mapId) {
            return;
        }

        try {
            const newSession = startAdventureSession(mapId);

            setSession(newSession);
        } catch (error) {
            console.error(error);
            navigate("/world");
        }
    }, [mapId, navigate]);

    if (!session) {
        return (
            <main className="min-h-screen bg-slate-950 p-6 text-white">
                <div className="mx-auto max-w-2xl">
                    <p className="text-white/50">Loading adventure...</p>
                </div>
            </main>
        );
    }

    return <AdventureScreen session={session} onExit={() => navigate("/world")} />;
}
