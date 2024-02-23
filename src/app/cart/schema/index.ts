import { OrderStatusEnum } from "@/app/order/[id]/types";
import { z, TypeOf } from "zod";

export const GetCartProductsSchema = z.array(
    z.object({
        id: z.string(),
        image: z.string(),
        quantity: z.number().gt(0),
        price: z.number().gt(0),
        status: z.enum(
            [
                OrderStatusEnum.PLACED,
                OrderStatusEnum.COMPLETED,
                OrderStatusEnum.PREPARING,
                OrderStatusEnum.OUTFORDELIVERY,
            ],
            {
                errorMap: () => ({ message: "enum is not valid" }),
            }
        ),
        name: z.string(),
    })
);
export const CreateCheckoutSchema = z.string();
export const DeleteCartItemSchema = z.string();



export type TDeleteCartItemSchema = TypeOf<typeof DeleteCartItemSchema>;
export type TCreateCheckoutSchema = TypeOf<typeof CreateCheckoutSchema>;
export type TGetCartProductsSchema = TypeOf<typeof GetCartProductsSchema>;
