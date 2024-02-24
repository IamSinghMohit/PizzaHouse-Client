import React from "react";
import CImage from "@/lib/CImage";
import { IndianRupee } from "lucide-react";

type Props = {
    topings: {
        id: string;
        name: string;
        image: string;
        price: number;
    }[];
};

function OrderTopingRenderer({ topings }: Props) {
    return (
        topings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 p-2 max-h-[300px] overflow-y-scroll">
                {topings.map((toping) => (
                    <div className="flex gap-1 items-start p-1 bg-gray-50 rounded-md border" key={toping.id}>
                        <CImage
                            src={toping.image || ""}
                            alt="toping image"
                            width={60}
                            height={60}
                            className="rounded-sm"
                        />
                        <div>
                            <h6>{toping.name}</h6>
                            <span className="flex items-center gap-1">
                                {" "}
                                <IndianRupee width={14} height={14} />
                                {toping.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
}

export default OrderTopingRenderer;
