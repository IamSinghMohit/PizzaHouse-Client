"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppDispatch } from "@/hooks";
import { setProductOrderSections } from "@/store/slices/product";
import { TProductSections } from "@/store/slices/product/type";
import { ChevronsDown } from "lucide-react";
import { useEffect, useMemo } from "react";
import { TProdutSectionsSchema } from "@/schema/product";

interface Props {
    data: TProdutSectionsSchema;
}

export default function ProductSectionsRenderer({ data }: Props) {
    const dispatch = useAppDispatch();

    const defaultAttributes = useMemo(() => {
        const obj: Record<string, string> = {};
        data?.default_attributes.forEach((att) => {
            obj[att.section] = att.id;
        });
        return obj;
    }, [data]);

    const Attributes = useMemo(() => {
        const obj: Partial<
            Record<string, { name: string; value: number; sec_name: string }>
        > = {};
        if (data) {
            data.sections.forEach((sec) => {
                sec.attributes.forEach((att) => {
                    obj[att.id] = {
                        name: att.name,
                        value: att.value,
                        sec_name: sec.name,
                    };
                });
            });
        }
        return obj;
    }, [data]);

    useEffect(() => {
        let obj: Record<string, TProductSections> = {};
        for (let key in defaultAttributes) {
            const id = defaultAttributes[key];
            const att = Attributes[id];
            if (!att) return;
            obj[att.sec_name] = {
                name: att.sec_name,
                value: att.value,
                attribute: att.name,
            };
        }
        dispatch(setProductOrderSections({ type: "SET", data: obj }));
    }, [Attributes]);

    return data?.sections.map((sec) => (
        <div key={sec.id}>
            <h6 className="text-black font-bold flex items-center">
                {sec.name}
                <span className="text-primary_orange">
                    <ChevronsDown height={20} />
                </span>
            </h6>
            <ToggleGroup
                type="single"
                variant={"outline"}
                defaultValue={defaultAttributes[sec.name]}
                onValueChange={(id) => {
                    const att = Attributes[id];
                    if (!att) return;
                    dispatch(
                        setProductOrderSections({
                            type: "ADD",
                            data: {
                                [sec.name]: {
                                    value: att.value,
                                    name: sec.name,
                                    attribute: att.name,
                                },
                            },
                        }),
                    );
                }}
            >
                {sec.attributes.map((att) => {
                    return (
                        <ToggleGroupItem
                            value={att.id}
                            className="bg-white border-2 shadow-sm data-[state=on]:border-primary_orange data-[state=on]:bg-white"
                            key={att.id}
                        >
                            {att.name}
                        </ToggleGroupItem>
                    );
                })}
            </ToggleGroup>
        </div>
    ));
}
