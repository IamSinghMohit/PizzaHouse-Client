"use client";
import Navbar from "@/components/Navbar";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface Props {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Provider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider store={store}>
                <Navbar />
                <div className="eclipse"></div>
                {children}
            </ReduxProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
