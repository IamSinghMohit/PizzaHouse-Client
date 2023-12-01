"use client";
import { useFormatedProducts } from "@/hooks/useFormatedProducts";
import ProductCard from "../ProductCard";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button } from "../ui/button";

interface Props {}

export default function ProductFeed({}: Props) {
    const { data = [] } = useFormatedProducts();
    return (
        <section>
            <div className="max-w-screen-xl mx-auto">
                {data.map((sec) => (
                    <div key={sec.id} className="flex flex-col">
                        <h5 className="font-roboto font-bold ">
                            {sec.category}
                        </h5>
                        <div className="flex gap-3 items-center flex-wrap">
                            {sec.products.map((pro) => (
                                <ProductCard
                                    key={pro.id}
                                    description={pro.description}
                                    heading={pro.name}
                                    image={pro.image}
                                    price={pro.price}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
