import Menu from "@/app/settings/components/Menu";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className="bg-white">
                <header>
                    <Menu />
                </header>
                {children}
            </body>
        </html>
    );
}
