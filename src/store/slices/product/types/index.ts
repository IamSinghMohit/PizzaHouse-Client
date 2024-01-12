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
    sections: Record<string, TProductSections>;
    id: string;
    name: string;
    image: string;
    price: number;
};
export type TProductSliceIntialState = {
    topings: Record<string, TProductTopings>;
    product_info: TProductInfo ;
    price:number;
};
