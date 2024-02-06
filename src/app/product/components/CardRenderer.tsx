"use client";

import React, { useEffect } from "react";
import { useInfiniteSearchProduct } from "../hooks/useInfiniteSearchProduct";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

type Props = {};

function CardRenderer({}: Props) {
    const param = useSearchParams();
    const { data, fetchNextPage } = useInfiniteSearchProduct({
        name: param.get("name") || "",
        category: param.get("category") || "",
        min: parseInt(param.get("min") || "0"),
        max: parseInt(param.get("max") || "0"),
    });

    const observer = useIntersectionObserver(() => {
        fetchNextPage();
    }, []);

    const arr = data?.pages.flat() || [];
    return (
        <div className="product-search-renderer">
            {arr.map((pro, index) => (
                <div ref={index === arr?.length - 2 ? observer : undefined}>
                    <ProductCard product={pro} key={pro.id} />
                </div>
            ))}
            {arr.length <= 0 && (
                <div className="w-full h-full col-span-3 flex items-center justify-center">
                    <div>🔍 Nothing Found</div>
                </div>
            )}
        </div>
    );
}

export default CardRenderer;
