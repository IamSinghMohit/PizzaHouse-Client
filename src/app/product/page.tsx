import { Card } from "@/components/ui/card";
import React from "react";
import { useSearchProducts } from "./hooks/useSearchProducts";

type Props = {
    searchParams: {
        category?: string;
        min?: number;
        max?: number;
        cursor?: string;
    };
};

export default function page({
    searchParams: { min, max, cursor, category },
}: Props) {
    const { data } = useSearchProducts({
        min,
        max,
        cursor,
        category,
    });
    return (
        <main>
            <Card className="p-2 bg-gray-50">
                {data.map((pro) => (
                    <p>{pro.name}</p>
                ))}
            </Card>
        </main>
    );
}
