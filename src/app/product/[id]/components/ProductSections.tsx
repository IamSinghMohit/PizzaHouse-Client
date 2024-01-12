"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppDispatch } from "@/hooks/state";
import useProductAttributes from "@/hooks/useProductAttributes";
import { setOrderProductSections } from "@/store/slices/product/product";
import { ChevronsDown } from "lucide-react";
import { useMemo, useRef } from "react";
interface Props {
    id: string;
}

export default function ProductSections({ id }: Props) {
    const { data } = useProductAttributes(id);
    const attRef = useRef<Record<string, { name: string; value: number }>>({});
    const dispatch = useAppDispatch();

    const defaultAttributes = useMemo(() => {
        const obj: Record<string, string> = {};
        data?.default_attributes.forEach((att) => {
            obj[att.section] = att.id;
        });
        return obj;
    }, [data]);

    return (
        <div className="flex flex-col gap-2 items-start">
            {data?.sections.map((sec) => (
                <div key={sec.id}>
                    <h6 className="text-black font-bold flex items-center">
                        {sec.name}
                        <span className="text-primary_orange">
                            <ChevronsDown height={20}/>
                        </span>
                    </h6>
                    <ToggleGroup
                        type="single"
                        variant={"outline"}
                        defaultValue={defaultAttributes[sec.name]}
                        onValueChange={(id) => {
                            dispatch(
                                setOrderProductSections({
                                    [sec.name]: {
                                        value: attRef.current[id].value,
                                        name: sec.name,
                                        attribute: attRef.current[id].name,
                                    },
                                }),
                            );
                        }}
                    >
                        {sec.attributes.map((att) => {
                            attRef.current[att.id] = {
                                value: att.value,
                                name: att.name,
                            };
                            return (
                                <ToggleGroupItem
                                    value={`${att.id}`}
                                    className="bg-white border-2 shadow-sm data-[state=on]:border-primary_orange data-[state=on]:bg-white"
                                    key={att.id}
                                >
                                    {att.name}
                                </ToggleGroupItem>
                            );
                        })}
                    </ToggleGroup>
                </div>
            ))}
        </div>
    );
}
