import {IndianRupee } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
interface Props {
    image: string;
    heading: string;
    price: number;
    description: string;
}

export default function ProductCard({
    image,
    heading,
    price,
    description,
}: Props) {
    return (
        <div className="max-w-sm w-[320px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-2 flex flex-col items-center hover:shadow-2xl">
            <Image
                width={240}
                height={200}
                layout="intrinsic"
                className="rounded-sm"
                src={image}
                alt="product image"
            />
            <div className="flex flex-col">
                <div className="p-4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-[16px]">
                        {heading}
                    </h5>
                    <p className="font-normal text-gray-700 text-[12px]">
                        {description.length > 80
                            ? `${description.slice(0, 80)}...`
                            : description}
                    </p>
                </div>
                <Button className="items-center w-[300px]">
                    <IndianRupee strokeWidth={3} size={15} />
                    {price}
                </Button>
            </div>
        </div>
    );
}
