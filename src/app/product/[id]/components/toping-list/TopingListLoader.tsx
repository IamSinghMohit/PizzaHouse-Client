import { Card } from "@/components/ui/card";
import React from "react";

type Props = {};

function TopingListLoader({}: Props) {
    return (
        <Card className="bg-gray-50 p-2 flex flex-wrap content-start gap-2 overflow-y-scroll absolute top-full mt-2 left-0 w-full h-[210px] md:h-full md:top-0 md:mt-0 md:left-full md:ml-2">
            {[
                "75901890-2e3b-4912-9991-1b89ed847f66",
                "8e838275-6756-45e4-8f49-9992354c9b40",
                "aa759a0d-b21d-415e-b6ac-fcd446f8517f",
                "0212870b-dea8-4f67-8344-960bbe0ab48e",
                "e1606d7d-22c6-4da7-8e87-dae219506709",
            ].map((id) => (
                <Card className="p-2 relative w-[118px] h-[166px]" key={id}>
                    <div className="flex flex-col gap-2 items-center justify-center mb-1">
                        <div className="h-3 w-[80px] shimmer" />
                        <div className="h-5 w-14 shimmer" />
                    </div>
                    <div className="w-[100px] h-[100px] shimmer rounded-md" />
                </Card>
            ))}
        </Card>
    );
}

export default TopingListLoader;
