'use client'

import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import { setOrderQuantity } from "@/store/slices/order/order";

function ProductQuantity() {
    const dispatch = useAppDispatch()
    const [value,setValue] = useState(1)
    const debouncedValue = useDebounce(value,350)
    useEffect(() => {
        dispatch(setOrderQuantity(debouncedValue))
    },[debouncedValue])
    return (
        <div>
            <label htmlFor="Quantity" className="sr-only">
                {" "}
                Quantity{" "}
            </label>

            <div className="flex items-center rounded border">
                <Button
                    type="button"
                    onClick={() => setValue((prev) => prev - 1 || 1)}
                    size={'icon'}
                    className="text-white rounded-sm rounded-r-none transition hover:opacity-75"
                >
                    <Minus width={20}/>
                </Button>

                <input
                    type="number"
                    id="Quantity"
                    value={value}
                   className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <Button
                    type="button"
                    size={'icon'}
                    onClick={() => setValue((prev) => prev + 1)}
                    className="text-white rounded-sm  rounded-l-none transition hover:opacity-75"
                >
                    <Plus width={20}/>
                </Button>
            </div>
        </div>
    );
}

export default ProductQuantity;
