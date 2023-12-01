"use client";
import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import ProductCard from "../ProductCard";
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [] } = useFormatedProducts();
    return (
        <section>
            <div className="max-w-screen-xl mx-auto">
                {data.map((sec) => (
                    <div key={sec.id} className="mx-2">
                        <h5 className="font-roboto font-bold ">
                            {sec.category}
                        </h5>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            modules={[Pagination]}
                            pagination={true}
                            onSlideChange={() => console.log("slide change")}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {sec.products.map((pro) => (
                                <SwiperSlide key={pro.id}>
                                    <ProductCard
                                        description={pro.description}
                                        heading={pro.name}
                                        image={pro.image}
                                        price={pro.price}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>
        </section>
    );
}
