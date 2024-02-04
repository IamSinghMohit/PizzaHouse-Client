"use client";

import React, { useEffect } from "react";
import { useInfiniteSearchProduct } from "./hooks/useInfiniteSearchProduct";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

type Props = {};

function CardRenderer({}: Props) {
    const param = useSearchParams();
    const { data, fetchNextPage } = useInfiniteSearchProduct({
        min: parseInt(param.get("min") || "0"),
        max: parseInt(param.get("max") || "0"),
        category: param.get("category") || "",
    });
    const observer = useIntersectionObserver(() => {
        fetchNextPage();
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);

    const arr = data?.pages.flat() || []
    return(
        <div className="min-h-[520px] product-search-renderer">
            {arr.map((pro, index) => (
                <div ref={index === arr?.length - 2 ? observer : undefined}>
                    <ProductCard product={pro} key={pro.id} />
                </div>
            ))}
        </div>,
    );
}

export default CardRenderer;
