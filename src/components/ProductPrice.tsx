"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useProductAttributes from "@/hooks/useProductAttributes";
interface Props {
    id: string;
}

export default function ProductPrice({ id }: Props) {
    const { data = [] } = useProductAttributes(id);
    return (
        <div className="flex flex-col gap-2 items-start">
            {data?.attributes.map((att) => (
                <div key={att.attribute_title}>
                    <h6 className="text-primary_orange">
                        {att.attribute_title}
                    </h6>
                    <ToggleGroup
                        type="single"
                        variant={"outline"}
                        defaultValue={data.default_prices[att.attribute_title].split(':')[1]}
                        // onValueChange={(val) => console.log(val)}
                    >
                        {att.attributes.map((a) => (
                            <ToggleGroupItem
                                value={`${a.value}`}
                                className="border-primary_orange data-[state=on]:bg-primary_orange"
                                key={`${(a.title, a.value)}`}
                            >
                                {a.title}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
            ))}
        </div>
    );
}
