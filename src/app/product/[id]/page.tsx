import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPrice from "./components/ProductPrice";
import ProductSections from "./components/ProductSections";
import TopingList from "./components/TopingList";
import { useProduct } from "@/hooks/useProduct";
import AddToCartButton from "./components/AddToCartButton";
import { Card } from "@/components/ui/card";
import { cache } from "react";
import { Metadata } from "next";
import { getCldOgImageUrl } from "next-cloudinary";

interface Props {
    params: {
        id: string;
    };
    searchParams: any;
}

const getProduct = cache(async (id: string) => await useProduct(id));

export async function generateMetadata(props: Props): Promise<Metadata> {
    const res = await getProduct(props.params.id);
    const publicId = res.image;
    return {
        title: res.name,
        description: res.description,
        openGraph: {
            images: [
                {
                    width: 1200,
                    height: 627,
                    url: getCldOgImageUrl({
                        src: publicId,
                        effects: [{ colorize: "100,co_black" }],
                        overlays: [
                            {
                                publicId,
                                width: 2400,
                                height: 1254,
                                crop: "fill",
                                effects: [
                                    {
                                        opacity: 60,
                                    },
                                ],
                            },
                            {
                                width: 1400,
                                crop: "fit",
                                text: {
                                    alignment: "center",
                                    color: "white",
                                    fontFamily: "Source Sans Pro",
                                    fontSize: 160,
                                    fontWeight: "bold",
                                    text: "test-headline",
                                },
                                position: {
                                    y: -100,
                                },
                            },
                            {
                                width: 1400,
                                crop: "fit",
                                text: {
                                    alignment: "center",
                                    color: "white",
                                    fontFamily: "Source Sans Pro",
                                    fontSize: 74,
                                    text: "test-body",
                                },
                                position: {
                                    y: 100,
                                },
                            },
                        ],
                    }),
                },
            ],
        },
    };
}

export default async function Page(props: Props) {
    const product = await getProduct(props.params.id);
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
                                className="border rounded-md overflow-hidden"
                            />
                        </div>
                        <Card className="p-2 shadow-none bg-gray-50">
                            <div>
                                <h1 className="font-bold text-[20px]">
                                    {product.name}
                                </h1>
                                <p className="text-gray-700 overflow-hidden break-words">
                                    {product.description}
                                </p>
                                <ProductPrice product={product} />
                            </div>
                            {product.sections.length > 0 && (
                                <ProductSections id={product.id} />
                            )}
                        </Card>
                    </div>
                    <TopingList category={product.category} />
                </div>
                <AddToCartButton />
            </MaxWidthWrapper>
        </article>
    );
}
