import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPrice from "./components/ProductPrice";
import ProductSections from "./components/ProductSections";
import TopingList from "./components/TopingList";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProduct";
import { Bike, ClipboardList } from "lucide-react";
import AddressDetail from "@/components/AddressDetail";

interface Props {
    params: {
        id: string;
    };
    searchParams: any;
}

export default async function Page(props: Props) {
    const product = await useProduct(props.params.id);
    return (
        <article className="pt-10">
            <MaxWidthWrapper>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-4">
                        <div>
                            <CImage
                                src={product.image}
                                width={400}
                                height={360}
                                alt="product image"
                                className="border border-red-300 rounded-md overflow-hidden"
                            />
                        </div>
                        <div>
                            <div>
                                <h1 className="font-bold text-[20px]">
                                    {product.name}
                                </h1>
                                <p className="text-gray-700 overflow-hidden break-words">
                                    {product.description}
                                </p>
                                <ProductPrice price={product.price} />
                            </div>
                            <ProductSections id={product.id} />
                        </div>
                    </div>
                    <TopingList category={product.category} />
                </div>
                <AddressDetail/>
            </MaxWidthWrapper>
        </article>
    );
}
