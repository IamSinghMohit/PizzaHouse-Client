import { Card } from "@/components/ui/card";

function ProductCardLoader() {
    return (
        <Card className="p-2 max-w-[278px] h-[330px]">
            <div className="w-[260px] h-[195px] rounded-sm shimmer" />
            <div className="flex flex-col h-[110px] justify-between gap-3 py-2">
                <div className="flex flex-col gap-1">
                    <div className="w-[120px] h-6 rounded shimmer" />
                    <div className="font-normal text-gray-700 w-full h-4 shimmer" />
                </div>
                <div>
                    <div className="mx-auto w-[100px] h-12 shimmer" />
                </div>
            </div>
        </Card>
    );
}

export default ProductCardLoader;
