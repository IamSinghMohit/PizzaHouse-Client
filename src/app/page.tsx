"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { SectionCards } from "@/data/section";
import SectionCard from "@/components/hero/card";
import ProductCard from "@/components/ProductCard";

export default function Home() {
    return (
        <div>
            <MaxWidthWrapper>
                <div className="flex flex-col gap-1 sm:flex-row pt-5 sm:pt-14">
                    <div className="text-primary_black font-inter flex flex-col p-2 gap-4 max-w-[457px] items-center justify-center">
                        <h1 className="text-[35px] leading-10 xs:text-[53px] xs:leading-[50px] lg:text-[70px] lg:leading-[72px]">
                            Not able to controll hunger{" "}
                            <span className="text-primary_orange">
                                order some pizza.
                            </span>
                        </h1>
                        <p className="text-primary_gray first-letter text-[12px] xs:text-[14px] md:text-[16px]">
                            Indulge in the ultimate pizza experience with our
                            mouthwatering selection that promises to elevate
                            your taste buds to new heights.
                        </p>
                    </div>
                    <div className="min-w-[300px]">
                        <Image
                            src="/hero.png"
                            layout="intrinsic"
                            width={500}
                            height={550}
                            alt="hero image"
                        />
                    </div>
                </div>
            </MaxWidthWrapper>

            <div className="home-clip w-full h-8 bg-primary_orange"></div>
            <section className="bg-secondary_dark overflow-x-scroll hideScrollbar">
                <MaxWidthWrapper className="flex gap-4">
                    {SectionCards.map((card) => (
                        <SectionCard
                            key={card.id}
                            content={card.content}
                            image={card.image}
                            heading={card.heading}
                        />
                    ))}
                </MaxWidthWrapper>
            </section>
            {/* Home Sectoin ends here */}
            <section>
                <h5 className="font-roboto font-bold ">Pizza</h5>
                <ProductCard
                    description="test"
                    heading="test"
                    image="/hero.png"
                    price={400}
                />
            </section>
        </div>
    );
}
