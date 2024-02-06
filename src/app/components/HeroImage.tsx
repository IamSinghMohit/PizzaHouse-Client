"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { StartIcon } from "@/icons";

function HoverCardA() {
    return (
        <Tilt
            className="max-w-[160px] absolute top-[10%] right-1/3 z-10"
            scale={1.5}
            transitionSpeed={2500}
        >
            <Card className="p-1 flex items-center gap-1 max-w-[180px] animate-float delay-500">
                <div className="relative w-5 h-5 xs:w-12 xs:h-12">
                    <Image
                        src="/assets/hover-card-images/sicilian-pizza.png"
                        fill
                        alt="new york pizza image"
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <h6 className="font-bold text-[10px] xs:text-[16px] whitespace-nowrap pr-1">
                        Sicilian Pizza
                    </h6>
                    <span className="flex items-center text-primary_orange gap-1">
                        <StartIcon width={16} height={16} />
                        <span className="text-gray-600 text-[14px]">4.9</span>
                    </span>
                </div>
            </Card>
        </Tilt>
    );
}
function HoverCardB() {
    return (
        <Tilt
            className="max-w-[160px] absolute top-1/3 z-10 left-[5%]"
            scale={1.5}
            transitionSpeed={2500}
        >
            <Card className="p-1 flex items-center gap-1 max-w-[180px] animate-float delay-1500">
                <div className="relative w-5 h-5 xs:w-12 xs:h-12">
                    <Image
                        src="/assets/hover-card-images/roman-pizza.png"
                        fill
                        alt="new york pizza image"
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <h6 className="font-bold text-[10px] xs:text-[16px] whitespace-nowrap pr-1">
                        Roman pizza
                    </h6>
                    <span className="flex items-center text-primary_orange gap-1">
                        <StartIcon width={16} height={16} />
                        <span className="text-gray-600 text-[14px]">4.6</span>
                    </span>
                </div>
            </Card>
        </Tilt>
    );
}
function HoverCardC() {
    return (
        <Tilt
            className="max-w-[160px] absolute left-1/2 top-[65%] z-10"
            scale={1.5}
            transitionSpeed={2500}
        >
            <Card className="p-1 flex items-center gap-1 max-w-[180px] animate-float delay-2000">
                <div className="relative w-5 h-5 xs:w-12 xs:h-12">
                    <Image
                        src="/assets/hover-card-images/burger.png"
                        fill
                        alt="new york pizza image"
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <h6 className="font-bold text-[10px] xs:text-[16px] whitespace-nowrap pr-1">
                        Ham Burger
                    </h6>
                    <span className="flex items-center text-primary_orange gap-1">
                        <StartIcon width={16} height={16} />
                        <span className="text-gray-600 text-[14px]">4.8</span>
                    </span>
                </div>
            </Card>
        </Tilt>
    );
}

export default function HeroImage({}) {
    return (
        <div className="relative max-w-full overflow-hidden hero-image">
            <HoverCardA />
            <HoverCardB />
            <HoverCardC />

            <Image
                src="/hero.png"
                alt="hsm:pt-14ero image"
                width={550}
                height={550}
                className="spinner"
            />
        </div>
    );
}
