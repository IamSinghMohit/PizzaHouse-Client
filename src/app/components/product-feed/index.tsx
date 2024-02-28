import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductFeedRenderer from "./ProductFeedRenderer";
import { GetFormatedProducts } from "@/hooks";

interface Props {}

export default async function ProductFeed({}: Props) {
    const data = await GetFormatedProducts();
    return (
        <section>
            <MaxWidthWrapper className="md:px-2 lg:px-20">
                <ProductFeedRenderer products={data || []} />
            </MaxWidthWrapper>
        </section>
    );
}
