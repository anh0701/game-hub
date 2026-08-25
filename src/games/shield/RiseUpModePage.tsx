import { useState } from "react";

import SetupPage from "./SetupPage";
import RiseUpPage from "./RiseUpPage";

import type { GameSetup } from "./models/GameSetup";

function RiseUpModePage() {
    const [setup, setSetup] = useState<GameSetup | null>(null);

    if (!setup) {
        return <SetupPage onStart={setSetup} />;
    }

    return <RiseUpPage setup={setup} />;
}

export default RiseUpModePage;
