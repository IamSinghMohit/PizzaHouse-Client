"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppDispatch } from "@/hooks/state";
import useProductAttributes from "@/hooks/useProductAttributes";
import { setOrderProductSections } from "@/store/slices/order/order";
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
                    <h6 className="text-primary_orange">{sec.name}</h6>
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
                                    className="border-primary_orange data-[state=on]:bg-primary_orange"
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
