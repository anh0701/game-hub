import Header from "../components/Header";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import { games } from "../data/games";

export default function Home() {
    return (
        <Layout>
            <Header />

            <main className="mx-auto max-w-7xl p-8">

                <h1 className="text-5xl font-bold">
                    Game Hub
                </h1>

                <p className="mt-3 text-slate-400">
                    Play classic browser games built with React.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.title}
                            description={game.description}
                            path={game.path}
                            available={game.available}
                        />
                    ))}
                </div>

            </main>
        </Layout>
    );
}