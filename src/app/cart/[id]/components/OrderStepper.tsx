import { OrderStatusEnum } from "@/app/order/[id]/types";
import { Bike, ClipboardList, UtensilsCrossed, CookingPot } from "lucide-react";
import React, { useMemo, useState } from "react";

const StepsArray = [
    {
        icon: <ClipboardList />,
        label: "Placed",
        value: OrderStatusEnum.PLACED,
        step: 0,
    },
    {
        icon: <CookingPot />,
        label: "Preparing",
        value: OrderStatusEnum.PREPARING,
        step: 1,
    },
    {
        icon: <Bike />,
        label: "Out For Delivery",
        value: OrderStatusEnum.OUTFORDELIVERY,
        step: 2,
    },
    {
        icon: <UtensilsCrossed />,
        label: "Completed",
        value: OrderStatusEnum.COMPLETED,
        step: 3,
    },
];

function getCurrentAttributes(value: OrderStatusEnum) {
    switch (value) {
        case OrderStatusEnum.PREPARING:
            return { width: "w-[33%]", status: OrderStatusEnum.PREPARING };
        case OrderStatusEnum.OUTFORDELIVERY:
            return { width: "w-[65%]", status: OrderStatusEnum.OUTFORDELIVERY };
        case OrderStatusEnum.COMPLETED:
            return { width: "w-full", status: OrderStatusEnum.COMPLETED };
        default:
            return { width: "w-0", status: "" };
    }
}
function OrderStepper({ step }: { step: string }) {
    const positionIndex = useMemo(() => {
        return StepsArray.find((item) => item.value === step)?.step || 0;
    }, [step]);
    return (
        <>
            <div className="flex items-center relative justify-between">
                {StepsArray.map((item) => (
                    <div
                        className={`pt-5 flex flex-col items-center z-[5] ${
                            item.step === 0 ? "-translate-x-2 " : ""
                        } ${item.step >= 3 ? "translate-x-5 " : ""}
                        `}
                        key={item.value}
                    >
                        <span
                            className={`w-[50px] h-[50px] flex items-center justify-center bg-white text-gray-700 rounded-full border-4 transition-all delay-200 ${
                                step === item.value
                                    ? "border-primary_orange text-primary_orange"
                                    : item.step < positionIndex
                                      ? "border-primary_orange text-primary_orange"
                                      : ""
                            } ${step === OrderStatusEnum.COMPLETED ? "border-primary_red text-primary_red" : ""}`}
                        >
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </div>
                ))}
                <div className="absolute h-1 w-full bg-gray-200 z-[4]">
                    <div
                        className={`absolute h-full bg-primary_orange transition-all duration-500 ${
                            getCurrentAttributes(step).width
                        } ${step === OrderStatusEnum.COMPLETED ? "bg-primary_red" : ""}`}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default OrderStepper;
