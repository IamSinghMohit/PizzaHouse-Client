import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInfiniteCategories } from "../hooks/useInfiniteCategories";
import CImage from "@/components/CImage";
import { useProductStats } from "@/hooks/useProductStats";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export function ProductSlider({
    setAmount,
    deafultValue,
}: {
    amount: number[];
    setAmount: Dispatch<SetStateAction<number[]>>;
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
    const { data, fetchNextPage, isFetchingNextPage, isLoading } =
        useInfiniteCategories();
    const [cats, setCats] = useState<Map<string, string>>(new Map());
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && initialLoading) {
            setInitialLoading(false);
        }
    }, [isLoading]);

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
        <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm flex-wrap gap-1 justify-between max-h-[136px] overflow-y-scroll md:max-h-full">
            {initialLoading
                ? arr.map((cat, index) => (
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
                              onClick={() => handleCategoryClick(cat.name)}
                          />
                      </div>
                  ))
                : [
                      "7605bb73-2c1a-4026-9959-44ce1de05206",
                      "75078d34-7e5c-4bcf-8388-8eea632418e2",
                      "6d676b72-9941-4db3-8896-61560cde4fcd",
                      "6013d5b4-e4c6-4622-b3ae-c832f6049103",
                      "8d7623a3-3588-46cc-a32e-02eb5212dcab",
                  ].map((i) => (
                      <div className="shimmer w-[55px] h-[55px]" key={i} />
                  ))}

            {isFetchingNextPage &&
                [
                    "c36899b5-cdcd-4f5f-97c2-4f6b2449a9f4",
                    "f2cb7656-2377-4626-83ac-1fab8dc07a4e",
                    "6ba15e00-15c2-408e-b26c-1fcdb3dcebab",
                    "9cb83a18-b655-45e3-9ea1-4b1e981775c3",
                ].map((i) => (
                    <div className="shimmer w-[55px] h-[55px]" key={i} />
                ))}
        </div>
    );
};
