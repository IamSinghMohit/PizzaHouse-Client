"use client";

import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import ProductCard from "../ProductCard";
import Link from "next/link";
// import { SwiperContainer, SwiperSlide } from "../swiper";
import { Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Button } from "../ui/button";
import MaxWidthWrapper from "../MaxWidthWrapper";

interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [] } = useFormatedProducts();
    return (
        <section>
            <MaxWidthWrapper>
                {data.map((sec, index) => (
                    <div key={sec.id}>
                        <Button>
                            <Link
                                href="product"
                                className="font-roboto text-[18px] hover:text-primary_orange active:text-primary_orange"
                            >
                                See more
                            </Link>
                        </Button>
                        <Swiper
                            modules={[Pagination]}
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                                bulletClass: "custom-pagination-bullet",
                                bulletActiveClass:
                                    "custom-pagination-bullet-active",
                            }}
                            breakpoints={{
                                620: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                1080: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                            }}
                            init={false}
                        >
                            {sec.products.map((pro) => (
                                <SwiperSlide key={pro.id}>
                                    <ProductCard product={pro} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </MaxWidthWrapper>
        </section>
    );
}
