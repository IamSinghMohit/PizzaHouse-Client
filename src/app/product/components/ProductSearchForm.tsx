import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInfiniteCategories } from "../hooks/useInfiniteCategories";
import CImage from "@/lib/CImage";
import { useProductStats } from "../hooks";
import { useIntersectionObserver } from "@/hooks";
import { Client, HydrationProvider, Server } from "react-hydration-provider";

export function ProductSlider({
    onValueCommit,
    deafultValue,
}: {
    onValueCommit: (e: [number, number]) => void;
    deafultValue: number[];
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
                onBlur={() => console.log("blur called")}
                onValueChange={setValue}
                onValueCommit={onValueCommit}
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
    onChange,
}: {
    onChange: (str: string) => void;
}) => {
    const { data, fetchNextPage, isLoading } = useInfiniteCategories();
    const [cats, setCats] = useState<Map<string, string>>(new Map());
    const shouldChange = useRef(false);
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
        if (shouldChange.current) {
            onChange(Array.from(cats.keys()).join(","));
        } else {
            shouldChange.current = true;
        }
    }, [cats]);

    const arr = data?.pages.flat() || [];
    return (
        <HydrationProvider>
            <Client>
                {isLoading ? (
                    <ProductCategorySelectorLoader />
                ) : (
                    <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm flex-wrap gap-1 max-h-[136px] overflow-y-scroll md:max-h-full">
                        {arr.map((cat, index) => (
                            <div
                                ref={(ref) => {
                                    if (index === arr?.length - 1 && ref) {
                                        observer(ref);
                                    }
                                }}
                                key={cat.id}
                            >
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
                                    onClick={() =>
                                        handleCategoryClick(cat.name)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Client>
            <Server>
                <ProductCategorySelectorLoader />
            </Server>
        </HydrationProvider>
    );
};

function ProductCategorySelectorLoader() {
    return (
        <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm flex-wrap gap-1 max-h-[136px] overflow-y-scroll md:max-h-full">
            {[
                "7605bb73-2c1a-4026-9959-44ce1de05206",
                "75078d34-7e5c-4bcf-8388-8eea632418e2",
                "6d676b72-9941-4db3-8896-61560cde4fcd",
                "6013d5b4-e4c6-4622-b3ae-c832f6049103",
                "8d7623a3-3588-46cc-a32e-02eb5212dcab",
            ].map((i) => (
                <div className="shimmer w-[55px] h-[55px]" key={i} />
            ))}
        </div>
    );
}
