import React from "react";
import { getProducts } from "./hooks/useInfiniteSearchProduct";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import ProductList from "./components/product-list";
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
            parseInt(min ? min : "0"),
            parseInt(max ? max : "0"),
        ],
        initialPageParam: "",
        queryFn: async () =>
            await getProducts({
                name,
                category,
                min: parseInt(min ? min : "0"),
                max: parseInt(max ? max : "0"),
            }),
    });

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MaxWidthWrapper className="md:px-1 flex justify-center flex-col gap-1 md:flex-row mt-1 md:h-[calc(100vh-74px)]">
                    <ProductSideBar />
                    <ProductList />
                </MaxWidthWrapper>
            </HydrationBoundary>
        </main>
    );
}
