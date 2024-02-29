import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ValidateBackendErrorResponse } from "@/utils";
import { ZodError } from "zod";
import { toast } from "sonner";
import { TLoginSchema, TUserSchema, UserSchema } from "@/schema/auth";
import { ValidateBackendResponse } from "@/utils";
import { TBackendErrorReponse } from "@/utils/makeRequest";
import { useMutation } from "@tanstack/react-query";

export function useUserLogin() {
    return useMutation<
        TUserSchema,
        AxiosError<TBackendErrorReponse>,
        TLoginSchema
    >({
        mutationKey: ["user", "login"],
        mutationFn: async (data) => {
            const result = await api.post("auth/login", data);
            return ValidateBackendResponse(result.data, UserSchema);
        },
        onError: (error) => {
            if (error instanceof ZodError) {
                return toast.error("received bad data");
            }
            const e = ValidateBackendErrorResponse(error.response?.data);
            toast.error(e.message);
        },
    });
}
