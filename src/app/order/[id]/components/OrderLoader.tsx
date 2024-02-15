import { Card } from "@/components/ui/card";
import React from "react";

type Props = {};

function OrderLoader({}: Props) {
    return (
        <>
            <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-md border mb-2">
                <div className="w-[170px] h-[128px] shimmer self-center" />
                <div className="flex flex-col gap-3">
                    <div className="h-4 w-16 shimmer" />
                    <div className="w-[500px] shimmer h-4" />
                    <div className="w-[400px] shimmer h-4" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 p-2 max-h-[300px] overflow-y-scroll">
                {[
                    "5f754aa1-eca5-437e-a5e9-c2dc41e03230",
                    "8244f642-9e63-43d4-8546-e6415d382609",
                    "22af9371-1e7b-497f-973f-373d9d8c1834",
                    "24fccda8-38f8-4b41-94c1-c624ed27f209",
                    "40eb673d-6a16-461a-93a3-e82ec213b707",
                ].map((toping) => (
                    <div
                        className="flex gap-1 items-start p-1 bg-gray-50 rounded-md border"
                        key={toping}
                    >
                        <div className="w-[60px] h-[60px] shimmer" />
                        <div>
                            <div className="w-[80px] h-3 shimmer mb-1" />
                            <div className="w-14 h-3 shimmer" />
                        </div>
                    </div>
                ))}
            </div>
            <Card className="p-2 mt-4 flex flex-col gap-4">
                <div className="h-[80px] shimmer" />
                <div className="h-4 w-[320px] shimmer ml-4" />
                <div className="h-4 w-[320px] shimmer ml-4" />
                <div className="h-4 w-[320px] shimmer ml-4" />
            </Card>
        </>
    );
}

export default OrderLoader;
