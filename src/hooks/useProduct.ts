import api from "@/lib/axios";

export async function  useProduct(id: string) {
    if (id) {
        return await api.get(`/product/${id}`).then((res) => res.data);
    }
    return null;
}
