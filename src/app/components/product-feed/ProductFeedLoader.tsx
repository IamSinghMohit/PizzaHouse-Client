import React from "react";
import MockProductFeed from "@/data/MockProductFeed";
import { Card } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {};

function ProductFeedLoader({}: Props) {
    return (
        <section>
            <MaxWidthWrapper className="md:px-2 lg:px-20">
                {MockProductFeed.map((sec) => (
                    <div key={sec.id}>
                        <div className="my-2 ml-4">
                            <div className="flex items-center gap-3">
                                <h4 className="shimmer h-9 w-[80px]">
                                    {sec.category}
                                </h4>
                                <button className="h-9 w-[120px] shimmer"></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center">
                            {sec.products.map((pro) => (
                                <Card
                                    className="p-2 max-w-[278px] h-[330px]"
                                    key={pro.id}
                                >
                                    <div className="w-[260px] h-[195px] rounded-sm shimmer" />
                                    <div className="flex flex-col h-[110px] justify-between gap-3 py-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="w-[120px] h-6 rounded shimmer" />
                                            <div className="font-normal text-gray-700 w-full h-4 shimmer" />
                                        </div>
                                        <div>
                                            <div className="mx-auto w-[100px] h-12 shimmer" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    );
}

export default ProductFeedLoader;
