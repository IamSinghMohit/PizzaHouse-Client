import { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client/debug";
import { initSocket } from "@/lib/socket";

const socketContext = createContext<Socket | null>(null);

export function useSocket(): Socket {
    return useContext(socketContext) as Socket;
}

export function SocketContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        console.log(socketRef.current)
        async function init() {
            socketRef.current = (await initSocket()) as unknown as Socket;
            socketRef.current.emit("join");
            socketRef.current.emit("join_room","65ae0d9ad8ee7b8203720575")
        }
         init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    return (
        <socketContext.Provider value={socketRef.current}>
            {children}
        </socketContext.Provider>
    );
}
