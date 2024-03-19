import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductFeedRenderer from "./ProductFeedRenderer";
import { useFormatedProducts } from "@/hooks";
import { Client, HydrationProvider, Server } from "react-hydration-provider";
import ProductFeedLoader from "./ProductFeedLoader";
interface Props {}

export default async function ProductFeed({}: Props) {
    const data = await useFormatedProducts();
    return (
        <section>
            <MaxWidthWrapper className="md:px-2 lg:px-20">
                <HydrationProvider>
                    <Client>
                        <ProductFeedRenderer products={data || []} />
                    </Client>
                    <Server>
                        <ProductFeedLoader />
                    </Server>
                </HydrationProvider>
            </MaxWidthWrapper>
        </section>
    );
}
