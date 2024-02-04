import axios from "@/lib/axios";
import { TGetProductSchema } from "@/schema/get";
import { useInfiniteQuery } from "@tanstack/react-query";

type opts = {
    category?: string;
    min?: number;
    max?: number;
    cursor?: string;
};

export async function getProducts({
    min,
    max,
    cursor,
    category,
}: opts): Promise<TGetProductSchema["data"][]> {
    let query = "/product?";
    if (max !== undefined) {
        query += `max=${max}&`;
    }
    if (min !== undefined) {
        query += `min=${min}&`;
    }
    if (cursor !== undefined) {
        query += `cursor=${cursor}&`;
    }
    if (category !== undefined) {
        query += `category=${category}&`;
    }

    // Remove the trailing '&' if present
    if (query.endsWith("&")) {
        query = query.slice(0, -1);
    }
    return await axios.get(query).then((res) => res.data.data);
}

export function useInfiniteSearchProduct(opts: opts) {
    return useInfiniteQuery({
        queryKey: ["product", "search", opts.min, opts.max, opts.category],
        initialPageParam: "",
        queryFn: async ({ pageParam }) =>
            await getProducts({ ...opts, cursor: pageParam }),
        getNextPageParam: (lastePage) =>
            lastePage.length >= 10
                ? lastePage[lastePage.length - 1].id
                : undefined,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
}
