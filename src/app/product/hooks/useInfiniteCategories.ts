import axios from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TGetCategorySchema } from "../schema";

async function InfiniteCategoryScroll(
    cursor?: string,
): Promise<TGetCategorySchema[]> {
    return await axios
        .get(`/category/search?name&limit=10&cursor=${cursor}`)
        .then((res) => res.data.data);
}

export function useInfiniteCategories() {
    return useInfiniteQuery({
        queryKey: ["category", "scroll"],
        queryFn: async ({ pageParam }) =>
            await InfiniteCategoryScroll(pageParam),
        initialPageParam: "",
        getNextPageParam: (lastePage) =>
            lastePage.length >= 10
                ? lastePage[lastePage.length - 1].id
                : undefined,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
}
