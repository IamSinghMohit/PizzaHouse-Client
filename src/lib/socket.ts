import { io } from "socket.io-client";
export function initSocket() {
    return io(process.env.NEXT_PUBLIC_BACKEND_URL, {
        timeout: 100000,
        forceNew: true,
        retries:1,
    });
}
