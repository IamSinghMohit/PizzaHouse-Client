import api from "@/lib/axios";
import { AxiosError } from "axios";
import { TSigninSchema, TUserSchema, UserSchema } from "@/schema/auth";
import { ValidateBackendErrorResponse, ValidateBackendResponse } from "@/utils";
import { TBackendErrorReponse } from "@/utils/makeRequest";
import { useMutation } from "@tanstack/react-query";
import { ZodError } from "zod";
import { toast } from "sonner";

export function useUserSignin() {
    return useMutation<
        TUserSchema,
        AxiosError<TBackendErrorReponse>,
        TSigninSchema
    >({
        mutationKey: ["user", "signin"],
        mutationFn: async (data) => {
            const result = await api.post("auth/signin", data);
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
