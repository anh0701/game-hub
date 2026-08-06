import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="border-b border-slate-700">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link to="/" className="text-2xl font-bold">
                    Game Hub
                </Link>

                <a
                    href="https://github.com/anh0701/game-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                    <FaGithub size={24} />
                </a>
            </div>
        </header>
    );
}
