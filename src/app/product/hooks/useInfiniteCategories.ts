import api from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
    GetInfiniteCategorySchema,
    TGetInfiniteCategorySchema,
} from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function InfiniteCategoryScroll(
    cursor?: string
): Promise<TGetInfiniteCategorySchema | []> {
    return await api
        .get(`/category/search?name&limit=10&cursor=${cursor}`)
        .then(
            (res) =>
                ValidateBackendResponse(res.data, GetInfiniteCategorySchema) ||
                []
        );
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
