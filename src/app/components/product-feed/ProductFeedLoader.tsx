import React from "react";
import MockProductFeed from "@/data/MockProductFeed";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCardLoader from "../product-card/ProductCardLoader";

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
                                <ProductCardLoader key={pro.id} />
                            ))}
                        </div>
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    );
}

export default ProductFeedLoader;
