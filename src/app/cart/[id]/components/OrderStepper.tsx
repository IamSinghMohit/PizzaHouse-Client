import { Bike, ClipboardList,UtensilsCrossed } from "lucide-react";
import React from "react";

function OrderStepper() {
    return (
        <ol className="flex items-center w-full">
            <li className="flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary_orange after:border-4 after:inline-block">
                <span className="flex items-center justify-center w-10 h-10 bg-primary_orange rounded-full lg:h-12 lg:w-12 shrink-0">
                    <ClipboardList />
                </span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block ">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                    {/* <CookingPot /> */}H
                </span>
            </li>
            <li className="flex items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                    <Bike />
                </span>
            </li>
            <li className="flex items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                    <UtensilsCrossed />
                </span>
            </li>
        </ol>
    );
}

export default OrderStepper;

