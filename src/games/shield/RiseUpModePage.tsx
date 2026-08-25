import { useState } from "react";

import SetupPage from "./SetupPage";
import RiseUpPage from "./RiseUpPage";

import type { GameSetup } from "./models/GameSetup";
import type { GameResult } from "../../adventure/models/GameResult";

interface RiseUpModePageProps {
    targetScore?: number;
    onComplete?: (result: GameResult) => void;
}

function RiseUpModePage({ targetScore, onComplete }: RiseUpModePageProps) {
    const [setup, setSetup] = useState<GameSetup | null>(null);

    if (!setup) {
        return <SetupPage onStart={setSetup} />;
    }

    return <RiseUpPage setup={setup} targetScore={targetScore} onComplete={onComplete} />;
}

export default RiseUpModePage;
