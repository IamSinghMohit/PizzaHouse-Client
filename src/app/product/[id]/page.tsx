import CImage from "@/components/CImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPrice from "@/components/ProductPrice";
import { useProduct } from "@/hooks/useProduct";
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
                <div className="flex flex-col md:flex-row gap-4">
                    <CImage
                        src={product.image}
                        width={400}
                        height={360}
                        alt="product image"
                        className="border border-red-300"
                    />
                    <div>
                        <div>
                            <h1 className="font-bold text-[20px]">
                                {product.name}
                            </h1>
                            <p className="text-gray-700 overflow-hidden break-words">
                                {product.description}
                            </p>
                        </div>
                            <ProductPrice id={product.id} />
                        <h6 className="my-1">
                            <span className="font-bold text-black">Price</span>:{" "}
                            {product.price}
                        </h6>
                    </div>
                </div>
            </MaxWidthWrapper>
        </article>
    );
}
