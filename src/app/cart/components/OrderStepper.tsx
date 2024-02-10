import { OrderStatusEnum } from "@/app/order/[id]/types";
import { Bike, ClipboardList, UtensilsCrossed, CookingPot } from "lucide-react";
import React, { useMemo } from "react";

const StepsArray = [
    {
        icon: <ClipboardList />,
        label: "Placed",
        enumValue: OrderStatusEnum.PLACED,
        step: 0,
    },
    {
        icon: <CookingPot />,
        label: "Preparing",
        enumValue: OrderStatusEnum.PREPARING,
        step: 1,
    },
    {
        icon: <Bike />,
        label: "Out For Delivery",
        enumValue: OrderStatusEnum.OUTFORDELIVERY,
        step: 2,
    },
    {
        icon: <UtensilsCrossed />,
        label: "Completed",
        enumValue: OrderStatusEnum.COMPLETED,
        step: 3,
    },
];

function getStylesForCurrentStatus(value: OrderStatusEnum) {
    switch (value) {
        case OrderStatusEnum.PREPARING:
            return "h-[33%] sm:w-[33%]";
        case OrderStatusEnum.OUTFORDELIVERY:
            return "h-[66%] sm:w-[66%]";
        case OrderStatusEnum.COMPLETED:
            return "h-full sm:w-full";
        default:
            return "h-0 sm:w-0";
    }
}

function OrderStepper({ step }: { step: string }) {
    const positionIndex = useMemo(() => {
        return StepsArray.find((item) => item.enumValue === step)?.step || 0;
    }, [step]);
    console.log(step);
    return (
        <>
            <div className="relative flex flex-col justify-between items-center h-[400px] pr-[150px] sm:flex-row sm:pr-0 sm:h-auto">
                {StepsArray.map((item) => (
                    <div className={`z-[5] relative`} key={item.enumValue}>
                        <span
                            className={`w-[50px] h-[50px] flex items-center justify-center bg-white text-gray-700 rounded-full border-4 transition-all delay-200 
                                ${
                                    step === item.enumValue
                                        ? "border-primary_orange text-primary_orange"
                                        : item.step < positionIndex
                                          ? "border-primary_orange text-primary_orange"
                                          : ""
                                } ${
                                    step === OrderStatusEnum.COMPLETED
                                        ? "border-primary_red text-primary_red"
                                        : ""
                                }`}
                        >
                            {item.icon}
                        </span>
                        <span
                            className={`absolute left-full top-1/4 whitespace-nowrap ml-5 sm:ml-0 sm:-left-1/2 sm:top-full ${
                                item.step === 0 ? "sm:ml-5" : ""
                            } ${item.step === 1 ? "sm:ml-3" : ""} ${
                                item.step === 2 ? "sm:-ml-3" : ""
                            }`}
                        >
                            <span>{item.label}</span>
                        </span>
                    </div>
                ))}

                <div className="absolute h-full w-1 sm:h-1 sm:w-full bg-gray-200 z-[4]">
                    <div
                        className={`absolute h-0 w-1 sm:h-1 sm:w-0 bg-primary_orange transition-all duration-500 ${getStylesForCurrentStatus(
                            step
                        )} 
                        ${
                            step === OrderStatusEnum.COMPLETED
                                ? "bg-primary_red"
                                : ""
                        } `}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default OrderStepper;
