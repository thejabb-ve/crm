import Link from "next/link";

export default function Button({
    buttonName,
    ariaLabel,
    buttonType,
    url,
    target,
    rel,
    addClass,
}: button.basic) {
    const buttonClass: string =
        "border border-red-300 hover:bg-red-200 p-3 rounded my-3";
    if (url)
        return (
            <Link href={url} aria-label={ariaLabel} target={target} rel={rel}>
                <button
                    aria-label={ariaLabel}
                    type={buttonType}
                    className={`${addClass} ${buttonClass}`}
                >
                    {buttonName}
                </button>
            </Link>
        );
    if (!url)
        return (
            <div>
                <button
                    aria-label={ariaLabel}
                    type={buttonType}
                    className={`${addClass} ${buttonClass}`}
                >
                    {buttonName}
                </button>
            </div>
        );
}
