import menu from "../json/menu";
import Link from "next/link";

export default function Menu() {
    return (
        <menu>
            <div className="flex border-b border-b-red-300">
                {menu.principal.map((item) => (
                    <div
                        key={item.key}
                        className="p-6 hover:bg-red-200 cursor-pointer"
                    >
                        <Link
                            href={item.url}
                            aria-label={item.ariaLabel}
                            target={item.target}
                            rel={item.rel}
                        >
                            {item.page}
                        </Link>
                    </div>
                ))}
            </div>
        </menu>
    );
}
