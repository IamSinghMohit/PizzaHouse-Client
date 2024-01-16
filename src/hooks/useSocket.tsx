import { initSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
import React, { useEffect, useRef } from "react";

type Props = {};

function useSocket({}: Props) {
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        async function init() {
            socketRef.current = (await initSocket()) as unknown as Socket;
            socketRef.current.emit("join");
        }
        init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);
    return socketRef.current;
}

export default useSocket;
