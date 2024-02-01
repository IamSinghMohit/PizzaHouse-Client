"use client"

import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import { useState } from "react";

export function ProductSlider() {
    const [value, setValue] = useState([0, 50]);
    return (
        <div >
            <Slider
                defaultValue={[0, 50]}
                min={0}
                max={1000}
                step={1}
                onValueChange={setValue}
            />
            <div className="flex gap-1 items-center mt-2 text-[14px]">
                <IndianRupee width={14} height={14}/>{" "}
                <span>
                    {value[0]} - {value[1]}
                </span>
            </div>
        </div>
    );
}
