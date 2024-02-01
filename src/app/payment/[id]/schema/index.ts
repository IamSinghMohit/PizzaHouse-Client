import { z, TypeOf } from "zod";

export const GetStripePublishKeySchema = z.object({
    success: z.boolean(),
    data: z.string(),
});
export type TGetStripePublishKeySchema = TypeOf<
    typeof GetStripePublishKeySchema
>;

export const PaymentIntentSchema = z.object({
    success: z.boolean(),
    data: z.object({
        client_secret: z.string(),
        total_price: z.number().gt(0),
    }),
});
export type TPaymentIntentSchema = TypeOf<typeof PaymentIntentSchema>;
