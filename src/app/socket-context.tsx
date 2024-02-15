import { createContext, useContext, useEffect, useRef, RefObject } from "react";
import { Socket } from "socket.io-client/debug";
import { initSocket } from "@/lib/socket";

const socketContext = createContext<RefObject<Socket | null>>({
    current: null,
});

export function useSocket() {
    return useContext(socketContext);
}

export function SocketContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        function init() {
            socketRef.current = initSocket() as Socket;
            socketRef.current.emit("join");
        }
        init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    return (
        <socketContext.Provider value={socketRef}>
            {children}
        </socketContext.Provider>
    );
}
