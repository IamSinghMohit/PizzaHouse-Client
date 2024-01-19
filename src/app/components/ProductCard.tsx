"use client";

import { IndianRupee } from "lucide-react";
import Link from "next/link";
import CImage from "@/components/CImage";
import { Button } from "@/components/ui/button";
import { TProductSchema } from "@/schema/base/product";
import { Card } from "@/components/ui/card";

interface Props {
    product: TProductSchema;
}

export default function ProductCard({ product }: Props) {
    return (
        <Card className="p-2 max-w-[278px] h-[330px]">
            <CImage
                width={260}
                height={195}
                className="rounded-sm"
                src={product.image}
                alt="product image"
            />
            <div className="flex flex-col h-[110px] justify-between">
                <div>
                    <h6 className="text-2xl -my-0 font-bold text-gray-900 text-[14px] md:text-[16px]">
                        {product.name}
                    </h6>
                    <p className="font-normal text-gray-700 text-[12px]">
                        {product.description.length > 80
                            ? `${product.description.slice(0, 80)}...`
                            : product.description}
                    </p>
                </div>
                <Link href={`/product/${product.id}`}>
                    <Button className="mx-auto flex w-[100px] items-center justify-center rounded-full bg-primary_orange text-white ">
                        <IndianRupee strokeWidth={3} size={15} />
                        {product.price}
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
