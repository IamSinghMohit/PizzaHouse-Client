import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const inter = Inter({
    weight: ["400", "600", "700"],
    variable: "--font-inter",
    preload: false,
});
const roboto = Roboto({
    weight: ["300", "400", "700"],
    variable: "--font-roboto",
    display: "swap",
    preload: false,
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    title: {
        default: "Pizzeria, tastiest pizza's in your city",
        template: "%s - Pizzeria",
    },
    description:
        "We provide our delivery services in many states of india.Just place your order and ready to fill up your stomach",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${roboto.variable} font-inter`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
