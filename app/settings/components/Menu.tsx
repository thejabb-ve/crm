import menu from "../json/menu";
import Link from "next/link";

export default function Menu() {
    return (
        <menu>
            <div className="flex border-b border-b-red-300">
                {menu.principal.map((item) => (
                    <Link
                        key={item.key}
                        href={item.url}
                        aria-label={item.ariaLabel}
                        target={item.target}
                        rel={item.rel}
                        className="p-6 hover:bg-red-200 cursor-pointer"
                    >
                        {item.page}
                    </Link>
                ))}
            </div>
        </menu>
    );
}
