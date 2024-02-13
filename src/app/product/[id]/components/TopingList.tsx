"use client";

import { useTopings } from "@/hooks/useTopings";
import React from "react";
import { IndianRupee, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import CImage from "@/components/CImage";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { TGetTopoingSchema } from "@/schema/get";
import { setProductTopings } from "@/store/slices/product";
import { TickFilledIcon } from "@/icons";

type Props = {
    category: string;
};

function Toping({ toping }: { toping: TGetTopoingSchema["data"][0] }) {
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
            className={`p-2 relative ${
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

function TopingList({ category }: Props) {
    const { data = [] } = useTopings(category);
    return (
        <Card className="bg-gray-50 p-2 max-h-[300px] flex flex-wrap gap-2 justify-between items-center overflow-y-scroll lg:max-w-[530px] lg:min-h-full lg:max-h-full w-full">
            {data.map((toping) => (
                <Toping toping={toping} key={toping.id} />
            ))}
        </Card>
    );
}

export default TopingList;
