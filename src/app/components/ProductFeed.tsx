"use client";

import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductCarousel from "./ProductCarousel";
import { ArrowRightFromLine } from "lucide-react";

interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [] } = useFormatedProducts();

    return (
        <section>
            <MaxWidthWrapper>
                {data.map((sec, index) => (
                    <div key={sec.id}>
                        <div className="my-2 ml-4">
                            <Link href="product" className="flex items-center gap-3">
                                <h4 className="font-bold">{sec.category}</h4>
                                <button className="p-2  border-2 border-primary_orange text-primary_orange rounded-full flex items-center gap-1 hover:bg-primary_orange hover:text-white px-3 transition-all duration-200">
                                    <span className="font-bold">more</span>
                                    <span>
                                        <ArrowRightFromLine />
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <ProductCarousel
                            products={sec.products}
                            delay={index || 1}
                        />
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    );
}
