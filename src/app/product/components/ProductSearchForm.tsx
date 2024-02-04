import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import { Dispatch, SetStateAction, useEffect,  useState } from "react";
import { useInfiniteCategories } from "../hooks/useInfiniteCategories";
import CImage from "@/components/CImage";
import { useProductStats } from "@/hooks/useProductState";

export function ProductSlider({
    setAmount,
}: {
    amount: number[];
    setAmount: Dispatch<SetStateAction<number[]>>;
}) {
    const { data } = useProductStats();
    const [value, setValue] = useState([0, 0]);
    return (
        <div>
            <Slider
                defaultValue={value}
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

    const handleCategoryClick = (categoryName: string) => {
        const newCats = new Map(cats); // Create a new map to avoid mutating the state directly
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

    return (
        <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm flex-wrap gap-1 justify-between max-h-[136px] md:max-h-full overflow-scroll">
            {data?.pages
                .flat()
                .map((cat) => (
                    <CImage
                        src={cat.image}
                        className={`rounded-md border-2 cursor-pointer border-primary_orange ${
                            cats.has(cat.name)
                                ? "outline-2 outline-primary_orange"
                                : ""
                        }`}
                        width={55}
                        height={55}
                        alt={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                    />
                ))}
        </div>
    );
};
