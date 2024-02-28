"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import React, {  useEffect, useState } from "react";
import ProductCard from "./product-card/ProductCard";
import { TGetFormatedProductsSchema } from "@/schema/product";
import { type CarouselApi } from "@/components/ui/carousel";
type Props = {
    products: TGetFormatedProductsSchema[0]["products"];
    category: string;
};

export default function ProductCarousel({ products, category }: Props) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [dots, setDots] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);


    useEffect(() => {
        if (api) {
            setDots(api.scrollSnapList());
            api.on("select", (emblaApi) => {
                setSelectedIndex(emblaApi.selectedScrollSnap());
            });
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
