import { FaFlag, FaGamepad, FaHome, FaPaw } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type NavItem =
    | {
          label: string;
          icon: typeof FaHome;
          path: string;
      }
    | {
          label: string;
          icon: typeof FaHome;
          href: string;
      }
    | {
          label: string;
          icon: typeof FaHome;
          scrollId: string;
      };

const navItems: NavItem[] = [
    {
        label: "Home",
        scrollId: "home",
        icon: FaHome,
    },
    {
        label: "Adventure",
        scrollId: "adventure",
        icon: FaFlag,
    },
    {
        label: "Challenges",
        scrollId: "challenges",
        icon: FaGamepad,
    },
    {
        label: "GitHub",
        href: "https://github.com/anh0701/game-hub",
        icon: FaGithub,
    },
];

export default function HomeHeader() {
    const navigate = useNavigate();

    function handleNavigation(item: NavItem) {
        if ("href" in item) {
            window.open(item.href, "_blank", "noopener,noreferrer");
            return;
        }

        if ("path" in item) {
            navigate(item.path);
            return;
        }

        if (item.scrollId === "home") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        const element = document.getElementById(item.scrollId);

        if (!element) {
            return;
        }

        const headerOffset = 80;

        const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    }

    return (
        <header className=" sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 shadow-lg shadow-black/20 backdrop-blur-xl ">
            <div className=" mx-auto flex max-w-4xl items-center justify-between px-4 py-3 ">
                {/* Logo */}
                <button
                    type="button"
                    onClick={() =>
                        handleNavigation({
                            label: "Home",
                            icon: FaHome,
                            scrollId: "home",
                        })
                    }
                    className="group flex items-center gap-2 text-left"
                >
                    <FaPaw
                        className="
                            animate-paw-stamp
                            origin-center
                            text-lg
                            text-cyan-300
                        "
                    />

                    <span
                        className="
                            text-lg
                            font-bold
                            tracking-tight
                            text-white
                            transition
                            duration-300
                            group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]
                        "
                    >
                        Cat's Adventure
                    </span>
                </button>

                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleNavigation(item)}
                                className=" flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/45 transition duration-200 hover:bg-white/10 hover:text-white "
                            >
                                <Icon className="text-xs" />
                                <span className="hidden sm:inline"> {item.label} </span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
