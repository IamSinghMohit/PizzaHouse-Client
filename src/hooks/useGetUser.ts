import api from "@/lib/axios";
import { GetUserSchema, TGetUserSchema } from "@/schema/get";
import { useQuery } from "@tanstack/react-query";

async function GetUser(): Promise<TGetUserSchema["data"]> {
    const result = await api.get("/auth/me").then((res) => res.data);
    try {
        return GetUserSchema.parse(result).data;
    } catch (error) {
        console.log(error);
        return { name: "", id: "", avatar: "" };
    }
}

export function useGetUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => GetUser(),
        retry: false,
        refetchOnWindowFocus: false,
    });
}
