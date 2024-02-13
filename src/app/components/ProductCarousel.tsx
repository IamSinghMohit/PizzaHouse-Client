import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { TGetFormatedProductsSchema } from "@/schema/get";

type Props = {
    products: TGetFormatedProductsSchema["data"][0]["products"];
    delay: number;
};

export default function ProductCarousel({ products, delay }: Props) {
    const plugin = useRef(
        Autoplay({ delay: delay * 2000, stopOnInteraction: true }),
    );

    const [api, setApi] = useState<EmblaCarouselType | null>(null);
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
            // plugins={[plugin.current]}
            opts={{
                align:'center'
            }}
            setApi={setApi}
        >
            <CarouselContent className="m-0">
                {products.map((pro) => (
                    <CarouselItem key={pro.id} className="basis-auto pl-2">
                        {" "}
                        <ProductCard product={pro} />
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
