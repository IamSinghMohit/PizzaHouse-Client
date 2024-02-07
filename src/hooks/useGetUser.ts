import api from "@/lib/axios";
import { GetUserSchema, TGetUserSchema } from "@/schema/get";
import { useQuery } from "@tanstack/react-query";

async function GetUser(): Promise<TGetUserSchema["data"] | undefined> {
    return await api
        .get("/auth/me")
        .then((res) => res.data)
        .then((res) => {
            try {
                return GetUserSchema.parse(res).data;
            } catch (err) {
                console.log(err);
                return undefined;
            }
        });
}

export function useGetUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => GetUser(),
        retry: false,
        refetchOnWindowFocus: false,
    });
}
