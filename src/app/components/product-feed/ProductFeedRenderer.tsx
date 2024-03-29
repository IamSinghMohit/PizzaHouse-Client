"use client";

import Link from "next/link";
import ProductCarousel from "../ProductCarousel";
import { ArrowRightFromLine } from "lucide-react";
import ProductCard from "../product-card/ProductCard";
import { useMediaQuery } from "react-responsive";
import { TGetFormatedProductsSchema } from "@/schema/product";

interface Props {
    products: TGetFormatedProductsSchema;
}

export default function ProductFeedRenderer({ products }: Props) {
    const showCarousel = useMediaQuery({ query: "(max-width:600px)" });
    return products.map((sec) => (
        <div key={sec.id}>
            <div className="my-2 ml-4">
                <div className="flex items-center gap-2">
                <h4 className="font-bold">{sec.category}</h4>
                <Link
                    href={`/product?name=&category=${sec.category}&min=0&max=0`}
                    className="flex items-center gap-3"
                >
                    <button className="p-2  border-2 border-primary_orange text-primary_orange rounded-full flex items-center gap-1 hover:bg-primary_orange hover:text-white px-3 transition-all duration-200">
                        <span className="font-bold">more</span>
                        <span>
                            <ArrowRightFromLine />
                        </span>
                    </button>
                </Link>
                </div>
            </div>
            {showCarousel ? (
                <ProductCarousel
                    products={sec.products}
                    category={sec.category}
                />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-center">
                    {sec.products.map((pro) => {
                        return (
                            <ProductCard
                                product={pro}
                                key={pro.id}
                                category={sec.category}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    ));
}
