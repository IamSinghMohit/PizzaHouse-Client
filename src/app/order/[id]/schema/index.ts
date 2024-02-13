import { z, TypeOf } from "zod";
import { OrderStatusEnum } from "../types";

export const GetOrderSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    quantity: z.number(),
    status: z.enum(
        [
            OrderStatusEnum.PLACED,
            OrderStatusEnum.COMPLETED,
            OrderStatusEnum.PREPARING,
            OrderStatusEnum.OUTFORDELIVERY,
        ],
        {
            errorMap: () => ({ message: "enum is not valid" }),
        },
    ),
    topings: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            image: z.string(),
            price: z.number(),
        }),
    ),
});

export type TGetOrderSchema = TypeOf<typeof GetOrderSchema>;
