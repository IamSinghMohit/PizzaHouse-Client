"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { TGetFormatedProductsSchema } from "@/schema/get";
import { EmblaCarouselType } from "embla-carousel";

type Props = {
    products: TGetFormatedProductsSchema["data"][0]["products"];
    category: string;
};

export default function ProductCarousel({ products, category }: Props) {
    const [api, setApi] = useState<Required<EmblaCarouselType> | null>(null);
    const [dots, setDots] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (api) {
            setDots(api.scrollSnapList());
            api.on("select", onSelect);
        }
    }, [api]);

    return (
        <Carousel
            opts={{
                align: "center",
            }}
            setApi={setApi}
        >
            <CarouselContent className="m-0">
                {products.map((pro) => (
                    <CarouselItem key={pro.id} className="basis-auto pl-2">
                        {" "}
                        <ProductCard product={pro} category={category} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex items-center gap-1 justify-center my-1">
                {dots.map((_, index) => (
                    <span
                        className={`p-1 rounded-full ${
                            index === selectedIndex
                                ? "bg-orange-600 opacity-100 "
                                : "bg-orange-400 opacity-35"
                        }`}
                        key={index}
                    ></span>
                ))}
            </div>
        </Carousel>
    );
}
