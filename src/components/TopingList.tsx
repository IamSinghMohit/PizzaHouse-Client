"use client";

import { useTopings } from "@/hooks/useTopings";
import React from "react";
import { Card } from "./ui/card";
import { IndianRupee, Search } from "lucide-react";
import CImage from "./CImage";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useAppDispatch } from "@/hooks/state";
import { setOrderTopings } from "@/store/slices/order/order";

type Props = {
    category: string;
};

function TopingList({ category }: Props) {
    const { data } = useTopings(category);
    const dispatch = useAppDispatch();
    return (
        <Card className="bg-gray-50 p-2 w-[450px] flex flex-col items-start gap-4">
            <div className="flex rounded-lg border bg-card text-card-foreground shadow-sm max-w-[280px] w-[280px] pl-1">
                <button className="text-primary_orange hover:cursor-default">
                    <Search />
                </button>
                <input className="p-2 focus:outline-none w-[245px]" />
            </div>
            <ToggleGroup
                type="multiple"
                className="flex flex-wrap gap-2"
                onValueChange={(top) => {
                    dispatch(
                        setOrderTopings(top.map((top) => JSON.parse(top))),
                    );
                }}
            >
                {data?.map((toping) => (
                    <ToggleGroupItem
                        key={toping.id}
                        value={JSON.stringify({
                            id: toping.id,
                            price: toping.price,
                        })}
                        className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col items-center justify-center max-w-[160px] data-[state=on]:bg-primary_orange_light"
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
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </Card>
    );
}

export default TopingList;
