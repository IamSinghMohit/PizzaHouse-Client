"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCategorySelector, ProductSlider } from "./ProductSearchForm";

export function ProductSideBar() {
    const param = useSearchParams();
    const minMax = [
        parseInt(param.get("min") || "0"),
        parseInt(param.get("max") || "0"),
    ];
    const [amount, setAmount] = useState<number[]>(minMax);
    const [input, setInput] = useState(param.get("name") || "");
    const [categories, setCategories] = useState(
        `${param.get("category") || ""}`,
    );
    const text = useDebounce(input, 300);
    const router = useRouter();

    useEffect(() => {
        router.push(
            `product?name=${input}&category=${categories}&min=${amount[0]}&max=${amount[1]}`,
        );
    }, [text, amount, categories]);

    return (
        <Card className="p-2 bg-gray-50 shadow-none flex flex-col gap-1 min-w-[250px] md:min-w-[270px] md:w-[270px]">
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
                <ProductSlider
                    amount={amount}
                    setAmount={setAmount}
                    deafultValue={minMax}
                />
            </div>
            <ProductCategorySelector setCategories={setCategories} />
        </Card>
    );
}
