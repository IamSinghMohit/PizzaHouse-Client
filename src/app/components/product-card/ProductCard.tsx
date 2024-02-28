import { IndianRupee } from "lucide-react";
import Link from "next/link";
import CImage from "@/lib/CImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
    product: {
        name: string;
        image: string;
        description: string;
        category?: string;
        price: number;
        id: string;
    };
    category?: string;
}

export default function ProductCard({ product, category }: Props) {
    const url = `/product/${product.name.trim()}-${
        category ? category : product.category
    }-${product.id}`;
    return (
        <Card className="p-2 max-w-[278px] h-[330px] hover:border-primary_orange">
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
                <Link href={url}>
                    <Button className="mx-auto flex w-[100px] items-center justify-center rounded-full bg-primary_orange text-white ">
                        <IndianRupee strokeWidth={3} size={15} />
                        {product.price}
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
