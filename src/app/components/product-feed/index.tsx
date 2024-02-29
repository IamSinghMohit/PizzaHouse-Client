import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductFeedRenderer from "./ProductFeedRenderer";
import { GetFormatedProducts } from "@/hooks";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { useFormedProductsQueryKeys } from "@/hooks/useFormatedProducts";

interface Props {}
export default async function ProductFeed({}: Props) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: useFormedProductsQueryKeys,
        staleTime:60 * 1000,
        queryFn: async () => await GetFormatedProducts(),
    });

    return (
        <section>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MaxWidthWrapper className="md:px-2 lg:px-20">
                    <ProductFeedRenderer />
                </MaxWidthWrapper>
            </HydrationBoundary>
        </section>
    );
}
