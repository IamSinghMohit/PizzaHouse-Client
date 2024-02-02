"use client";

import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useInfiniteCategories } from "../hooks/useInfiniteCategories";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import CImage from "@/components/CImage";
import { useProductStats } from "@/hooks/useProductState";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export function ProductSlider({
    amount,
    setAmount,
}: {
    amount: number[];
    setAmount: Dispatch<SetStateAction<number[]>>;
}) {
    const { data } = useProductStats();
    return (
        <div>
            <Slider
                defaultValue={amount}
                min={0}
                max={data?.max_price || 500}
                step={1}
                onValueCommit={setAmount}
            />
            <div className="flex gap-1 items-center mt-2 text-[14px]">
                <span className="flex items-center">
                    <span>
                        <IndianRupee width={13} height={13} />
                    </span>{" "}
                    <span>{amount[0]}</span>
                </span>{" "}
                -
                <span className="flex items-center">
                    <span>
                        <IndianRupee width={13} height={13} />
                    </span>{" "}
                    <span>{amount[1]}</span>
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
        console.log("use effect");
        setCategories(Array.from(cats.keys()).join(","));
    }, [cats]);

    return (
        <div className="flex rounded-lg border bg-card p-2 text-card-foreground shadow-sm felx-wrap gap-1">
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

export function ProductSideBar() {
    const [amount, setAmount] = useState<number[]>([0, 0]);
    const [input, setInput] = useState("");
    const [categories, setCategories] = useState("");
    const text = useDebounce(input, 300);
    const router = useRouter();

    useEffect(() => {
        router.push(
            `product?name=${input}&min=${amount[0]}&max=${amount[1]}&category=${categories}`,
        );
    }, [text, amount, categories]);

    return (
        <Card className="p-2 bg-gray-50 shadow-none flex flex-col gap-1">
            <div className="flex rounded-lg border bg-card text-card-foreground p-2 flex-col gap-3">
                <div className="border pl-1 rounded-md flex items-center">
                    <button className="text-primary_orange hover:cursor-default">
                        <Search />
                    </button>
                    <input
                        className="p-2 focus:outline-none w-full rounded-r-lg"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <ProductSlider amount={amount} setAmount={setAmount} />
            </div>
            <ProductCategorySelector setCategories={setCategories} />
        </Card>
    );
}
