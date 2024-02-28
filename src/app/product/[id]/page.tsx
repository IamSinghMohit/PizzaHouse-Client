import { useProduct } from "./hooks/useProduct";
import { Suspense, cache } from "react";
import { Metadata } from "next";
import { getCldOgImageUrl } from "next-cloudinary";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CImage from "@/lib/CImage";
import { Card } from "@/components/ui/card";
import ProductPrice from "./components/ProductPrice";
import ProductSections from "./components/product-section";
import AddToCartButton from "./components/AddToCartButton";
import TopingList from "./components/toping-list";
import TopingListLoader from "./components/toping-list/TopingListLoader";
import ProductSectionsLoader from "./components/product-section/ProductSectionsLoader";
import ErrorBoundary from "@/lib/error-boundary";

interface Props {
    params: {
        id: string;
    };
    searchParams: any;
}

const getProduct = cache(async (id: string) => await useProduct(id));

export async function generateMetadata(props: Props): Promise<Metadata> {
    const arr = props.params.id.split("-");
    const id = arr[arr.length - 1];
    const res = await getProduct(id);
    if (!res) {
        return {
            title: "product-not-found",
        };
    }
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
                                    text: res.name,
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
                                    color: "#FE8D0D",
                                    fontFamily: "Source Sans Pro",
                                    fontSize: 74,
                                    text: "Pizzeria - testiest pizza's in your city",
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
    const arr = props.params.id.split("-");
    const id = arr[arr.length - 1];
    const product = await getProduct(id);
    if (!product) {
        return redirect(`/`);
    }
    const paramId = encodeURIComponent(
        `${product.name.trim()}-${product.category}-${product.id}`,
    );
    if (paramId !== props.params.id) {
        redirect(
            `/product/${product.name.trim()}-${product.category}-${product.id}`,
        );
    }
    return (
        <article className="pt-2 md:pt-10">
            <MaxWidthWrapper>
                <div className={`relative w-full mb-[230px] md:w-1/2 md:mb-0`}>
                    <div className="flex flex-col gap-1 flex-1">
                        <CImage
                            src={product.image}
                            width={360}
                            height={320}
                            alt="product image"
                            sizes="(max-width: 768px)100vw, (max-width: 1200px)50vw, 30vw"
                            className="rounded-md overflow-hidden mx-auto"
                        />
                        <Card className="p-2 shadow-none bg-gray-50">
                            <div>
                                <h1 className="font-bold text-[20px]">
                                    {product.name}
                                </h1>
                                <p className="text-gray-700 overflow-hidden break-words text-[14px]">
                                    {product.description}
                                </p>
                                <ProductPrice product={product} />
                            </div>
                            {product.sections.length > 0 && (
                                <Suspense fallback={<ProductSectionsLoader />}>
                                    <ProductSections id={product.id} />
                                </Suspense>
                            )}
                        </Card>
                    </div>

                    <ErrorBoundary message="*Error while fetching topings">
                        <Suspense fallback={<TopingListLoader />}>
                            <TopingList
                                category={product.category}
                                className={
                                    "absolute top-full mt-2 left-0 w-full h-[210px] md:h-full md:top-0 md:mt-0 md:left-full md:ml-2"
                                }
                            />
                        </Suspense>
                    </ErrorBoundary>
                </div>
                <AddToCartButton className="mt-2 w-[150px] sm:max-w-[190px] mx-auto lg:mr-auto lg:ml-0 text-xl" />
            </MaxWidthWrapper>
        </article>
    );
}
