import ProductCard from "./ProductCard";
import { Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


export default function ProductCarousel({

}: Props) {
    return (
        <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
                clickable: true,
                bulletClass: "custom-pagination-bullet",
                bulletActiveClass: "custom-pagination-bullet-active",
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
    );
}
