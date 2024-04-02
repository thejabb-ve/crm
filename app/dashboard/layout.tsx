import Menu from "@/app/settings/components/Menu";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white">
            <header>
                <Menu />
            </header>
            {children}
        </div>
    );
}
