'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="eclipse"></div>
            <div className="flex flex-col gap-2">
                <div className="text-primary_black font-inter flex flex-col ">
                    <h1 className="text-[40px] leading-10">
                        Don't able to controll hunger{" "}
                        <span className="text-primary_orange">
                            order some pizza.
                        </span>
                    </h1>
                    <p className="text-primary_gray first-letter text-[16px]">
                        Indulge in the ultimate pizza experience with our
                        mouthwatering selection that promises to elevate your
                        taste buds to new heights. Crafted with passion and
                        precision, our pizzas boast a perfect fusion of premium
                        ingredients, a crispy golden crust, and a symphony of
                        flavors that will transport you to pizza paradise.
                    </p>
                </div>
                <div>
                  <Image src="/hero_image.png" width={800} height={800} alt="hero image"/>
                </div>
            </div>
        </div>
    );
}
