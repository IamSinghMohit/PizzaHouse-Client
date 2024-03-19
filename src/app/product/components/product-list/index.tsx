"use client";

import { useInfiniteSearchProduct } from "../../hooks";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/product-card/ProductCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import ProductListLoader from "./ProductListLoader";
import { Card } from "@/components/ui/card";

type Props = {};

function ProductList({}: Props) {
    const param = useSearchParams();
    const { data, fetchNextPage, isLoading } = useInfiniteSearchProduct({
        name: param.get("name") || "",
        category: param.get("category") || "",
        min: parseInt(param.get("min") || "0"),
        max: parseInt(param.get("max") || "0"),
    });

    const observer = useIntersectionObserver(() => {
        fetchNextPage();
    }, []);

    const arr = data?.pages.flat() || [];
    return isLoading ? (
        <ProductListLoader />
    ) : (
        <Card className="p-2 bg-gray-50 overflow-y-scroll w-full h-[500px] min-h-[500px] md:h-auto product-list-grid thin-scroll-thumb">
            {arr.length == 0 && (
                <p>😔 Nothing found</p>
            )}
            {arr.map((pro, index) => (
                <div
                    ref={(el) => {
                        if (index === arr?.length - 2 && el) {
                            observer(el);
                        }
                    }}
                    key={pro.id}
                >
                    <ProductCard product={pro} key={pro.id} />
                </div>
            ))}
        </Card>
    );
}

export default ProductList;
