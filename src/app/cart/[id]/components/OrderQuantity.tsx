"use client";

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";

interface IProps {
    handleValueChange: (value: number) => void;
    quantity: number;
}
function OrderQuantity({ handleValueChange, quantity }: IProps) {
    const [value, setValue] = useState(quantity || 1);
    const debouncedValue = useDebounce(value, 250);

    useEffect(() => {
        handleValueChange(debouncedValue);
    }, [debouncedValue]);

    return (
        <div>
            <label htmlFor="Quantity" className="sr-only">
                {" "}
                Quantity{" "}
            </label>

            <div className="flex items-center rounded-3xl border">
                <Button
                    type="button"
                    onClick={() => setValue((prev) => prev - 1 || 1)}
                    size={"icon"}
                    className="text-white rounded-sm rounded-r-none transition hover:opacity-75 rounded-l-2xl"
                >
                    <Minus width={20} />
                </Button>

                <input
                    type="number"
                    id="Quantity"
                    value={value}
                    className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    readOnly
                />

                <Button
                    type="button"
                    size={"icon"}
                    onClick={() => setValue((prev) => prev + 1)}
                    className="text-white rounded-sm  rounded-l-none transition hover:opacity-75 rounded-r-2xl"
                >
                    <Plus width={20} />
                </Button>
            </div>
        </div>
    );
}

export default OrderQuantity;
