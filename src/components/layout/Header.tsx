import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="border-b border-slate-700">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    Game Hub
                </Link>

            </div>
        </header>
    );
}