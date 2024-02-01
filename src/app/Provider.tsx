"use client";

import Navbar from "@/components/Navbar";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SocketContextProvider } from "./socket-context";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
interface Props {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Provider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" richColors={true} theme="light" duration={3000}/>
            <ReduxProvider store={store}>
                <SocketContextProvider>
                    <Navbar />
                    <div className="eclipse"></div>
                    {children}
                    <Footer/>
                </SocketContextProvider>
            </ReduxProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
