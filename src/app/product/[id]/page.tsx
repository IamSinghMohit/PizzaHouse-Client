import { useProduct } from "./hooks/useProduct";
import { cache } from "react";
import { Metadata } from "next";
import { getCldOgImageUrl } from "next-cloudinary";
import ProductPreview from "./components/ProductPreview";
import { redirect } from "next/navigation";

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
    if(!res){
        return {
            title:'product-not-found'
        }
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
    if(!product){
        return redirect(
            `/`,
        );
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
            <ProductPreview product={product} />
        </article>
    );
}
