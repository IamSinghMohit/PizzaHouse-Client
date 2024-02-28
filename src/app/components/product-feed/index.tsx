import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getProducts } from "@/hooks/useFormatedProducts";
import ProductFeedRenderer from "./ProductFeedRenderer";

interface Props {}

export default async function ProductFeed({}: Props) {
    const data = await getProducts();
    return (
        <section>
            <MaxWidthWrapper className="md:px-2 lg:px-20">
                <ProductFeedRenderer products={data || []} />
            </MaxWidthWrapper>
        </section>
    );
}
