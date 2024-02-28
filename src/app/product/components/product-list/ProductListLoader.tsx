import ProductCardLoader from "@/app/components/product-card/ProductCardLoader";
import { Card } from "@/components/ui/card";

function ProductListLoader() {
    return (
        <Card className="p-2 bg-gray-50 overflow-y-scroll w-full min-h-[500px] grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
                "41ebf1d1-6815-472a-860c-a329be131140",
                "26451fe5-b976-48fb-bb38-17d6db9753ff",
                "dafe57d2-8ffa-4e41-beb7-1901e1718f91",
                "5d374090-3883-45e2-9eeb-68142c09eb83",
                "e742daf3-e4c8-4c12-a9e6-0978c49af509",
                "dff4f6b9-17c7-4473-a4c9-aabb8d65b307",
                "4128ca71-72b1-4ebf-8936-afef47db6d6c",
                "c70a0a66-602b-416e-b160-9519bd86cab6",
                "97eb25dd-8ed0-44a5-9f80-274072f4de05",
            ].map((pro) => (
                <ProductCardLoader key={pro} />
            ))}
        </Card>
    );
}

export default ProductListLoader;
