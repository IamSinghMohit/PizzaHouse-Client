"use client";

import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductCarousel from "./ProductCarousel";

interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [] } = useFormatedProducts();

    return (
        <section>
            <MaxWidthWrapper>
                {data.map((sec) => (
                    <div key={sec.id}>
                        <Button>
                            <Link
                                href="product"
                                className="font-roboto text-[18px] hover:text-primary_orange active:text-primary_orange"
                            >
                                See more
                            </Link>
                        </Button>
                        <ProductCarousel products={sec.products}/>
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    );
}
