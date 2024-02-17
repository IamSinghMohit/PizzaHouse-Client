"use client";

import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import Link from "next/link";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductCarousel from "./ProductCarousel";
import { ArrowRightFromLine } from "lucide-react";
import ProductCard from "./ProductCard";
import { useMediaQuery } from "react-responsive";
import ProductFeedLoader from "./ProductFeedLoader";

interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [], isLoading = false } = useFormatedProducts();
    const showCarousel = useMediaQuery({ query: "(max-width:600px)" });
    return (
        <section>
            <MaxWidthWrapper>
                {isLoading ? (
                    <ProductFeedLoader />
                ) : (
                    data.map((sec, index) => (
                        <div key={sec.id}>
                            <div className="my-2 ml-4">
                                <Link
                                    href={`/product?category=${sec.category}`}
                                    className="flex items-center gap-3"
                                >
                                    <h4 className="font-bold">
                                        {sec.category}
                                    </h4>
                                    <button className="p-2  border-2 border-primary_orange text-primary_orange rounded-full flex items-center gap-1 hover:bg-primary_orange hover:text-white px-3 transition-all duration-200">
                                        <span className="font-bold">more</span>
                                        <span>
                                            <ArrowRightFromLine />
                                        </span>
                                    </button>
                                </Link>
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
                    ))
                )}
            </MaxWidthWrapper>
        </section>
    );
}
