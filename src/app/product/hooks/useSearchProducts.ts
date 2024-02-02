
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type opts = {
    category?: string;
    min?: number;
    max?: number;
    cursor?: string;
};

async function getProducts({ min, max, cursor, category }: opts) {
    let query = "/products?";
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
    return await axios.get(query).then((res) => res.data.data)
}

export async  function useSearchProducts(opts: opts) {
    return useQuery({
        queryKey:['products','search'],
        queryFn:() => getProducts(opts)
    });
}
