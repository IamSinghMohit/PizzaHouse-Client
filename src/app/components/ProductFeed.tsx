"use client";

import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../components/ui/button";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Carousel, CarouselContent, CarouselItem } from "../../components/ui/carousel";
import { useRef } from "react";

interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [] } = useFormatedProducts();

    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
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
                        <Carousel plugins={[plugin.current]}>
                            <CarouselContent>
                                {sec.products.map((pro) => (
                                    <CarouselItem key={pro.id}>
                                        {" "}
                                        <ProductCard product={pro} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    );
}
