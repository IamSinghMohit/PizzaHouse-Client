import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import React from "react";
import ProductListLoader from "./components/product-list/ProductListLoader";

type Props = {};

function Loading({}: Props) {
    return (
        <MaxWidthWrapper className="md:px-1 flex justify-center flex-col gap-1 md:flex-row mt-1 md:h-[calc(100vh-74px)]">
            <Card className="p-2 bg-gray-50 shadow-none flex flex-col gap-1 min-w-[250px] md:min-w-[270px] md:w-[270px]">
                <div className="flex rounded-lg border bg-card text-card-foreground p-2 flex-col gap-3">
                    <div className="h-12 shimmer" />
                    <div className="h-3 shimmer" />
                </div>
                <div className="min-h-[80px] w-full md:min-h-[300px] shimmer" />
            </Card>
            <ProductListLoader />
        </MaxWidthWrapper>
    );
}

export default Loading;
