import ProductSectionsRenderer from "./ProductSectoinRenderer";
import { getProductAttributes } from "../../hooks/useProductAttributes";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";

interface Props {
    id: string;
}

export default async function ProductSections({ id }: Props) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["product", "attributes", id],
        staleTime:60 * 1000,
        queryFn: async () => await getProductAttributes(id),
    });
    return (
        <div className="flex flex-col gap-2 items-start">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductSectionsRenderer id={id} />
            </HydrationBoundary>
        </div>
    );
}
