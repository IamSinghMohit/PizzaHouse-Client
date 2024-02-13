"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useEffect, useRef, useState } from "react";
import { initSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
import ClientOrderRenderer from "./components/ClientOrderRenderer";
import ServerOrderRenderer from "./components/ServerOrderRenderer";

type Props = {
    params: {
        id?: string;
    };
};

export default function page({ params }: Props) {
    const id = params.id || "";
    const [loading, setLoading] = useState(true);
    const socketRef = useRef<Socket | null>(null);
    const [step, setStep] = useState("");

    useEffect(() => {
        setLoading(false);
    }, []);

    const shouldRenderServerData = !id.startsWith("client");

    useEffect(() => {
        async function init() {
            if (shouldRenderServerData) {
                socketRef.current = initSocket() as unknown as Socket;
                socketRef.current.emit("join");
                socketRef.current.emit("join_room", id);

                socketRef.current.on("status_updated", (data) => {
                    setStep(data.status);
                });
            }
        }
        init();
        return () => {
            socketRef.current?.emit("leave_room", id);
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    return (
        <MaxWidthWrapper className="mt-10">
            {!loading &&
                (shouldRenderServerData ? (
                    <ServerOrderRenderer id={id} step={step} />
                ) : (
                    <ClientOrderRenderer id={id} />
                ))}
        </MaxWidthWrapper>
    );
}
