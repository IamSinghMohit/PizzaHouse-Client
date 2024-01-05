export type TOrderProductSections = {
    name: string;
    attribute: string;
    value: number;
};
export type TOrderSliceInitialState = {
    price: number;
    topings: Array<{id:string,price:number}>;
    product_sections: Record<string,TOrderProductSections>;
    product_id: string;
    quantity:number;
};
