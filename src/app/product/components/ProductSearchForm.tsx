import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteCategories } from "../hooks/useInfiniteCategories";
import CImage from "@/components/CImage";
import { useProductStats } from "@/hooks/useProductStats";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export function ProductSlider({
    setAmount,
    deafultValue
}: {
    amount: number[];
    setAmount: Dispatch<SetStateAction<number[]>>;
    deafultValue:number[]
}) {
    const { data } = useProductStats();
    const [value, setValue] = useState(deafultValue);
    return (
        <div>
            <Slider
                defaultValue={deafultValue}
                min={0}
                max={data?.max_price || 500}
                step={1}
                onValueChange={setValue}
                onValueCommit={setAmount}
            />
            <div className="flex gap-1 items-center mt-2 text-[14px]">
                <span className="flex items-center">
                    <span>
                        <IndianRupee width={13} height={13} />
                    </span>{" "}
                    <span>{value[0]}</span>
                </span>{" "}
                -
                <span className="flex items-center">
                    <span>
                        <IndianRupee width={13} height={13} />
                    </span>{" "}
                    <span>{value[1]}</span>
                </span>
            </div>
        </div>
    );
}

export const ProductCategorySelector = ({
    setCategories,
}: {
    setCategories: Dispatch<SetStateAction<string>>;
}) => {
    const { data, fetchNextPage } = useInfiniteCategories();
    const [cats, setCats] = useState<Map<string, string>>(new Map());
    const observer = useIntersectionObserver(() => {
        fetchNextPage();
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        const newCats = new Map(cats); 
        if (newCats.has(categoryName)) {
            newCats.delete(categoryName);
        } else {
            newCats.set(categoryName, categoryName);
        }
        setCats(newCats);
    };

    useEffect(() => {
        setCategories(Array.from(cats.keys()).join(","));
    }, [cats]);

    const arr = data?.pages.flat() || [];
    return (
        <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm flex-wrap gap-1 justify-between max-h-[136px] md:max-h-full overflow-scroll">
            {arr.map((cat, index) => (
                <div ref={index == arr?.length - 1 ? observer : undefined}>
                    <CImage
                        src={cat.image}
                        className={`rounded-md border-2 cursor-pointer ${
                            cats.has(cat.name)
                                ? "border-primary_orange "
                                : ""
                        }`}
                        width={55}
                        height={55}
                        alt={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                    />
                </div>
            ))}
        </div>
    );
};
