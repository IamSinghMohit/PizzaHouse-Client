import axios from "@/lib/axios";
import { TGetProductSchema } from "@/schema/get";
import { useInfiniteQuery } from "@tanstack/react-query";

type opts = {
    category?: string;
    name?: string;
    min?: number;
    max?: number;
    cursor?: string;
};

export async function getProducts({
    min,
    max,
    cursor,
    category,
    name,
}: opts): Promise<TGetProductSchema["data"][]> {
    let query = "/product?";
    if (typeof Number(max) === "number") {
        query += `max=${Number(max)}&`;
    }
    if (typeof Number(min) === 'number') {
        query += `min=${Number(min)}&`;
    }
    if (cursor !== undefined) {
        query += `cursor=${cursor}&`;
    }
    if (category !== undefined) {
        query += `category=${category}&`;
    }
    if (name !== undefined) {
        query += `name=${name}&`;
    }

    // Remove the trailing '&' if present
    if (query.endsWith("&")) {
        query = query.slice(0, -1);
    }
    return await axios.get(query).then((res) => res.data.data);
}

export function useInfiniteSearchProduct(opts: opts) {
    return useInfiniteQuery({
        queryKey: [
            "product",
            "search",
            opts.name,
            opts.category,
            opts.min,
            opts.max,
        ],
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
