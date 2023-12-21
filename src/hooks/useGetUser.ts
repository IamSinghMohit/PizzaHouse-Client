import api from "@/lib/axios";
import { UserSchema } from "@/schema";
import { useQuery } from "@tanstack/react-query";

async function GetUser() {
    const result =  await api.get("/auth/me").then((res) => res.data)
    const data = UserSchema.parse(result);
    return data
}

export function useGetUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => GetUser(),
        retry:false,
        refetchOnWindowFocus:false,
    });
}
