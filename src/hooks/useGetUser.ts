import api from "@/lib/axios";
import { TUserSchema, UserSchema } from "@/schema/auth";
import { ValidateBackendResponse } from "@/utils";
import { useQuery } from "@tanstack/react-query";

async function GetUser(): Promise<TUserSchema | undefined> {
    return await api
        .get("/auth/me")
        .then((res) => ValidateBackendResponse(res.data, UserSchema));
}

export function useGetUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => GetUser(),
        retry: false,
        refetchOnWindowFocus: false,
    });
}
