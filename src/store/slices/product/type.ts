export type TProductSections = {
    name: string;
    attribute: string;
    value: number;
};
export type TProductTopings = {
    id: string;
    price: number;
    name: string;
    image: string;
};
export type TProductInfo = {
    order_sections: Record<string, TProductSections>;
    id: string;
    name: string;
    image: string;
    price: number;
    description:string;
};
export type TProductSliceIntialState = {
    topings: Record<string, TProductTopings>;
    product_info: TProductInfo ;
    total_price:number;
};
