"use client";

import CImage from "@/lib/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPrice from "./ProductPrice";
import ProductSections from "./ProductSections";
import TopingList from "./TopingList";
import AddToCartButton from "./AddToCartButton";
import { Card } from "@/components/ui/card";
import { TProductSchema } from "@/schema/base/product";
import { useEffect, useRef, useState } from "react";

type Props = {
    product: TProductSchema;
};

function ProductPreview({ product }: Props) {
    const childRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(180);

    useEffect(() => {
        if (childRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                // Assuming only one entry in the array for simplicity
                const newHeight = entries[0].target.clientHeight;
                setHeight(newHeight);
            });

            resizeObserver.observe(childRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [childRef]);

    return (
        <MaxWidthWrapper>
            <div className={`flex gap-2 flex-col lg:flex-row`}>
                <div className="flex flex-col gap-1 flex-1" ref={childRef}>
                    <CImage
                        src={product.image}
                        width={400}
                        height={360}
                        alt="product image"
                        sizes="(max-width: 768px)100vw, (max-width: 1200px)50vw, 30vw"
                        className="rounded-md overflow-hidden mx-auto"
                    />
                    <Card className="p-2 shadow-none bg-gray-50">
                        <div>
                            <h1 className="font-bold text-[20px]">
                                {product.name}
                            </h1>
                            <p className="text-gray-700 overflow-hidden break-words text-[14px]">
                                {product.description}
                            </p>
                            <ProductPrice product={product} />
                        </div>
                        {product.sections.length > 0 && (
                            <ProductSections id={product.id} />
                        )}
                    </Card>
                </div>

                <TopingList category={product.category} height={height} />
            </div>
            <AddToCartButton className="mt-2 w-full sm:max-w-[190px] mx-auto lg:mr-auto lg:ml-0 text-xl" />
        </MaxWidthWrapper>
    );
}

export default ProductPreview;
