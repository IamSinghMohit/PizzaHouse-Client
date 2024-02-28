import ProductSectionsRenderer from "./ProductSectoinRenderer";
import { getProductAttributes } from "../../hooks/useProductAttributes";

interface Props {
    id: string;
}

export default async function ProductSections({ id }: Props) {
    const data = await getProductAttributes(id);
    return (
        <div className="flex flex-col gap-2 items-start">
            <ProductSectionsRenderer
                data={data || { sections: [], default_attributes: [] }}
            />
        </div>
    );
}
