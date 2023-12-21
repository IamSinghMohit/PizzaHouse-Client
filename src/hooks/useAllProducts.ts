import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Opts {
    category?: string;
    name?: string;
    featured?: string;
    max?: number;
    min?: number;
    limit?: number;
    page?: number;
    status?: "Published" | "Draft";
}
function getAllProducts(op: Opts) {
    let url = "/products/all";

    if (op.category) {
        url += `?category=${op.category}`;
    }
    if (op.name) {
        url += `&name=${op.name}`;
    }
    if (op.featured) {
        url += `&featured=${op.featured}`;
    }
    if (op.min !== undefined) {
        url += `&min=${op.min}`;
    }
    if (op.max !== undefined) {
        url += `&max=${op.max}`;
    }
    if (op.status) {
        url += `&status=${op.status}`;
    }

    return api.get(url);
}

export function useAllProduct(opts: Opts) {
    return useQuery({
        queryFn: () => getAllProducts(opts),
        queryKey: [
            "product",
            `name=${opts.name}`,
            `min=${opts.min}&max=${opts.max}`,
            `featured=${opts.featured}`,
            `status=${opts.status}`,
            `category=${opts.category}`,
        ],
    });
}
