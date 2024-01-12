"use client";

import { useTopings } from "@/hooks/useTopings";
import React from "react";
import { IndianRupee, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import CImage from "@/components/CImage";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { TGetTopoingSchema } from "@/schema/get";
import { setProductTopings } from "@/store/slices/product/product";

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
            className={`p-2 ${
                isActive ? "p-[7px] border-2 border-primary_orange" : ""
            }`}
        >
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
                width={142}
                height={142}
                className="rounded-md overflow-hidden"
            />
        </Card>
    );
}

function TopingList({ category }: Props) {
    const { data = [] } = useTopings(category);
    return (
        <Card className="bg-gray-50 p-2 w-[450px] flex flex-col items-start gap-4">
            <div className="flex rounded-lg border bg-card text-card-foreground shadow-sm max-w-[280px] w-[280px] pl-1">
                <button className="text-primary_orange hover:cursor-default">
                    <Search />
                </button>
                <input className="p-2 focus:outline-none w-[245px]" />
            </div>
            <div className="flex flex-wrap gap-2">
                {data.map((toping) => (
                    <Toping toping={toping} key={toping.id} />
                ))}
            </div>
        </Card>
    );
}

export default TopingList;
