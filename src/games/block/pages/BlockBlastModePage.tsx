import { useNavigate } from "react-router-dom";
import { FaGamepad, FaLayerGroup } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

import Layout from "../../../components/Layout";
import { BLOCK_ROUTES } from "../constants/routes";

export default function BlockBlastModePage() {
    const navigate = useNavigate();

    return (
        <Layout>
            <main className="flex min-h-[100dvh] w-full items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Block</h1>

                        <p className="mt-2 text-sm text-white/50">Choose your game mode</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() => navigate(BLOCK_ROUTES.classic)}
                            className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-white/20 hover:bg-white/10 active:scale-[0.99]"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-white/80">
                                        <FaGamepad />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Classic</h2>

                                        <p className="mt-1 text-sm text-white/50">
                                            Play freely and beat your high score.
                                        </p>
                                    </div>
                                </div>

                                <FiChevronRight className="text-xl text-white/30 transition group-hover:translate-x-1 group-hover:text-white/70" />
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(BLOCK_ROUTES.levels)}
                            className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-white/20 hover:bg-white/10 active:scale-[0.99]"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-white/80">
                                        <FaLayerGroup />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Levels</h2>

                                        <p className="mt-1 text-sm text-white/50">
                                            Complete levels with different objectives.
                                        </p>
                                    </div>
                                </div>

                                <FiChevronRight className="text-xl text-white/30 transition group-hover:translate-x-1 group-hover:text-white/70" />
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
