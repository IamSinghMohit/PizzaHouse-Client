import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import React from "react";
import ProductSectionsLoader from "./components/product-section/ProductSectionsLoader";
import TopingListLoader from "./components/toping-list/TopingListLoader";

function Loading() {
    return (
        <article className="pt-2 md:pt-10">
            <MaxWidthWrapper>
                <div className="relative w-full mb-[230px] md:w-1/2 md:mb-0">
                    <div className="max-w-[360px] h-[270px] w-full shimmer mx-auto mb-1" />
                    <Card className="p-2 shadow-none bg-gray-50 flex flex-col gap-2">
                        <div className="h-5 w-[190px] shimmer" />
                        <div className="h-4 w-full shimmer" />
                        <ProductSectionsLoader />
                    </Card>
                    <TopingListLoader />
                </div>
                <div className="mt-2 w-[150px] sm:w-[190px] h-9 mx-auto lg:mr-auto lg:ml-0 text-xl shimmer" />
            </MaxWidthWrapper>
        </article>
    );
}

export default Loading;
