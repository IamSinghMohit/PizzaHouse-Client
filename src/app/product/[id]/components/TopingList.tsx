"use client";

import { IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTopings } from "../hooks/useTopings";
import CImage from "@/lib/CImage";
import { useAppDispatch,useAppSelector } from "@/hooks";
import { TGetTopoingSchema } from "@/schema/get";
import { setProductTopings } from "@/store/slices/product";
import { TickFilledIcon } from "@/icons";
import { useMediaQuery } from "react-responsive";

type Props = {
    category: string;
    height: number;
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

function TopingList({ category, height }: Props) {
    const { data = [] } = useTopings(category);
    const isLargeScreen = useMediaQuery({query:"(min-width: 1024px)"})
    return (
        <Card
            className={`bg-gray-50 p-2 max-h-[300px] flex flex-wrap gap-2 justify-between overflow-y-scroll lg:max-w-[524px] w-full lg:justify-normal`}
            style={isLargeScreen ? { maxHeight: height, height: height } : {}}
        >
            {data.map((toping) => (
                <Toping toping={toping} key={toping.id} />
            ))}
        </Card>
    );
}

export default TopingList;
