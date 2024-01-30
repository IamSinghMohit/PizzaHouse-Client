import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const inter = Inter({
    weight: ["400","600", "700"],
    variable: "--font-inter",
});
const roboto = Roboto({
    weight: ["300", "400", "700"],
    variable: "--font-roboto",
    display:'swap'
});

export const metadata: Metadata = {
    title: {
        default: "Pizzeria tastiest pizza's in your city",
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
