"use client";

import { IndianRupee } from "lucide-react";
import Link from "next/link";
import CImage from "@/components/CImage";
import { Button } from "@/components/ui/button";
import { TProductSchema } from "@/schema/base/product";

interface Props {
    product: TProductSchema;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="max-w-[320px] mx-auto w-[300px] h-[360px] bg-white border border-gray-200 rounded-lg  p-2 flex flex-col items-center hover:shadow-md mb-3 gap-3">
            <CImage
                width={290}
                height={200}
                className="rounded-sm"
                src={product.image}
                alt="product image"
            />
            <div className="flex flex-col justify-between gap-2">
                <div>
                    <h6 className="text-2xl -my-1 font-bold text-gray-900 text-[14px] md:text-[16px]">
                        {product.name}
                    </h6>
                    <p className="font-normal text-gray-700 text-[12px]">
                        {product.description.length > 80
                            ? `${product.description.slice(0, 80)}...`
                            : product.description}
                    </p>
                </div>
                <Link href={`/product/${product.id}`}>
                    <Button className="items-center w-full">
                        <IndianRupee strokeWidth={3} size={15} />
                        {product.price}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
