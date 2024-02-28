"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { useQueryState } from "next-usequerystate";
import { ProductCategorySelector, ProductSlider } from "./ProductSearchForm";

export function ProductSideBar() {
    const [min, setMin] = useQueryState("min");
    const [max, setMax] = useQueryState("max");
    const [name, setName] = useQueryState("name");
    const [_, setCategory] = useQueryState("category");
    const [text, setText] = useState(name || "");
    const searchedName = useDebounce(text, 400);

    useEffect(() => {
        setName(searchedName);
    }, [searchedName]);

    return (
        <Card className="p-2 bg-gray-50 shadow-none flex flex-col gap-1 min-w-[250px] md:min-w-[270px] md:w-[270px]">
            <div className="flex rounded-lg border bg-card text-card-foreground p-2 flex-col gap-3">
                <div className="border pl-1 rounded-md flex items-center">
                    <button className="text-primary_orange hover:cursor-default">
                        <Search />
                    </button>
                    <input
                        className="p-2 focus:outline-none w-full rounded-r-lg"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <ProductSlider
                    onValueCommit={(e) => {
                        setMin(`${e[0]}`);
                        setMax(`${e[1]}`);
                    }}
                    deafultValue={[parseInt(min || "0"), parseInt(max || "0")]}
                />
            </div>
            <ProductCategorySelector onChange={(e) => setCategory(e)} />
        </Card>
    );
}
