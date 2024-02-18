import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SectionCards } from "@/data/section";
import ProductFeed from "@/app/components/ProductFeed";
import ServiceCard from "./components/ServiceCard";
import HomeTypeWriter from "./components/HomeTypeWriter";
import HeroImage from "./components/HeroImage";
import { Client, HydrationProvider, Server } from "react-hydration-provider";

export default function Home() {
    return (
        <main>
            <HydrationProvider>
                <MaxWidthWrapper className="md:px-2 lg:px-20">
                    <div className="flex flex-col gap-1 sm:flex-row pt-5 ">
                        <div className="text-primary_black font-inter flex flex-col p-2 gap-4 font-bold  max-w-[457px] items-center justify-center">
                            <h1 className="text-[35px] leading-10 xs:text-[53px] xs:leading-[50px] lg:text-[70px] lg:leading-[72px]">
                                Not able to controll your hunger{" "}
                                <span className="text-primary_orange whitespace-nowrap">
                                    order some
                                    <Client>
                                        <HomeTypeWriter />
                                    </Client>
                                    <Server>
                                        <br />|
                                    </Server>
                                </span>
                            </h1>
                            <p className="text-primary_gray first-letter text-[12px] xs:text-[14px] md:text-[16px]">
                                Indulge in the ultimate pizza experience with
                                our mouthwatering selection that promises to
                                elevate your taste buds to new heights.
                            </p>
                        </div>
                        <HeroImage />
                    </div>
                </MaxWidthWrapper>

                <div className="home-clip w-full h-8 bg-primary_orange"></div>
                <section className="bg-secondary_dark overflow-x-scroll hideScrollbar">
                    <MaxWidthWrapper className="flex gap-4">
                        {SectionCards.map((card) => (
                            <ServiceCard
                                key={card.id}
                                content={card.content}
                                image={card.image}
                                heading={card.heading}
                            />
                        ))}
                    </MaxWidthWrapper>
                </section>
                {/* Home Sectoin ends here */}
                <ProductFeed />
            </HydrationProvider>
        </main>
    );
}
