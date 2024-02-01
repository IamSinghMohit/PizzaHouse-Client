"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useInfiniteCategories } from "./hooks/useInfiniteCategories";
import CImage from "@/components/CImage";
import { ProductSlider } from "./components";

type Props = {};

export default function page({}: Props) {
    const { data ,fetchNextPage} = useInfiniteCategories();
    useEffect(() => {
        console.log(data);
    });
    return (
        <main>
            <MaxWidthWrapper className="flex flex-col gap-2 md:flex-row">
                <Card className="p-2 bg-gray-50 shadow-none flex flex-col gap-1">

                    <div className="flex rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex-col gap-3">
                        <div className="border max-w-[280px] w-[280px] pl-1 rounded-md flex items-center">
                            <button className="text-primary_orange hover:cursor-default">
                                <Search />
                            </button>
                            <input className="p-2 focus:outline-none w-[245px]" />
                        </div>
                        <ProductSlider />
                    </div>

                    <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm">
                        {data?.pages
                            .flat()
                            .map((cat) => (
                                <CImage
                                    src={cat.image}
                                    className="rounded-md border-2"
                                    width={40}
                                    height={40}
                                    alt={cat.name}
                                />
                            ))}
                    </div>
                </Card>
                <Card className="p-2 bg-gray-50"></Card>
            </MaxWidthWrapper>
        </main>
    );
}
