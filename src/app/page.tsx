import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="eclipse absolute -top-5 -left-[200px]"></div>
            <div>
                <div className="text-primary_black font-inter">
                    <h1 className="text-[80px] leading-[110px]">
                        Don't able to controll hunger{" "}
                        <span className="text-primary_orange">
                            order some pizza.
                        </span>
                    </h1>
                    <p className="text-primary_gray first-letter font-[16px]">
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
