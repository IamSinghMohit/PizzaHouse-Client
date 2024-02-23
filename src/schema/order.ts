import { z, TypeOf } from "zod";

export const GetStripePublishKeySchema = z.string();
export type TGetStripePublishKeySchema = TypeOf<
    typeof GetStripePublishKeySchema
>;
