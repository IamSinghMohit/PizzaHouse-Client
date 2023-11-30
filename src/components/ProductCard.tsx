import { ArrowRightSquare } from "lucide-react";
import Image from "next/image";
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
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <Image
                width={240}
                height={200}
                layout="intrinsic"
                src={image}
                alt="product image"
            />
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {heading}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">{description}</p>
                <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    {price}
                    <ArrowRightSquare/>
                </a>
            </div>
        </div>
    );
}
