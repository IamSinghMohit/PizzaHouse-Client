"use client";

import Navbar from "@/components/Navbar";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../components/Footer";
import { SocketContextProvider } from "./socket-context";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

interface Props {
    children: React.ReactNode;
}

export const CachedQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            refetchIntervalInBackground: false,
        },
    },
});

export default function Provider({ children }: Props) {
    return (
        <QueryClientProvider client={CachedQueryClient}>
            <Toaster
                position="top-center"
                richColors={true}
                theme="light"
                duration={3000}
            />
            <ReduxProvider store={store}>
                <SocketContextProvider>
                    <Suspense>
                        <Navbar />
                    </Suspense>
                    <div className="eclipse"></div>
                    {children}
                    <Suspense>
                        <ProgressBar
                            height="2px"
                            color="#FE8D0D"
                            options={{ showSpinner: false }}
                            shallowRouting
                        />
                    </Suspense>
                    <Footer />
                </SocketContextProvider>
            </ReduxProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
