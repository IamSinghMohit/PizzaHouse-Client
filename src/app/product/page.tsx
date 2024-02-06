import { Card } from "@/components/ui/card";
import React from "react";
import { getProducts } from "./hooks/useInfiniteSearchProduct";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import CardRenderer from "./components/CardRenderer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductSideBar } from "./components";

type Props = {
    searchParams: {
        category?: string;
        name?: string;
        min?: string;
        max?: string;
    };
};

export default async function page({
    searchParams: { min, max, category, name },
}: Props) {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: [
            "product",
            "search",
            name,
            category,
            parseInt(min),
            parseInt(max),
        ],
        initialPageParam: "",
        queryFn: async () =>
            await getProducts({
                name,
                category,
                min: parseInt(min),
                max: parseInt(max),
            }),
    });
    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MaxWidthWrapper className="md:px-1 flex justify-center flex-col gap-1 md:flex-row mt-1 product-search-height">
                    <ProductSideBar />
                    <Card className="p-2 bg-gray-50 overflow-y-scroll w-full min-h-[500px]">
                        <CardRenderer />
                    </Card>
                </MaxWidthWrapper>
            </HydrationBoundary>
        </main>
    );
}
