"use client";

import { IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";
import CImage from "@/lib/CImage";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { TTopingSchema } from "@/schema/topings";
import { setProductTopings } from "@/store/slices/product";
import { TickFilledIcon } from "@/icons";

function Toping({ toping }: { toping: TTopingSchema[0] }) {
    const isActive = useAppSelector(
        (state) => state.product.topings[toping.id],
    );
    const dispatch = useAppDispatch();
    function handleAddtopoing() {
        if (!isActive) {
            dispatch(
                setProductTopings({
                    type: "ADD",
                    data: {
                        [toping.id]: {
                            price: toping.price,
                            name: toping.name,
                            id: toping.id,
                            image: toping.image,
                        },
                    },
                }),
            );
        } else {
            dispatch(
                setProductTopings({
                    type: "DELETE",
                    data: {
                        [toping.id]: {
                            price: toping.price,
                            id: toping.id,
                            name: toping.name,
                            image: toping.image,
                        },
                    },
                }),
            );
        }
    }
    return (
        <Card
            onClick={handleAddtopoing}
            className={`p-2 relative w-[118px] h-[166px] ${
                isActive ? "p-[7px] border-2 border-primary_orange" : ""
            }`}
        >
            <div
                className={`w-4 h-4 absolute right-2 ${
                    isActive ? "block" : "hidden"
                }`}
            >
                <TickFilledIcon />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h5 className="font-bold">{toping.name}</h5>
                <p className="flex items-center gap-1">
                    <IndianRupee strokeWidth={3} size={15} />
                    {toping.price}
                </p>
            </div>
            <CImage
                src={toping.image}
                alt="toping-image"
                width={100}
                height={100}
                className="rounded-md overflow-hidden"
            />
        </Card>
    );
}
export default Toping;
