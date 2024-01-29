"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { StartIcon } from "@/icons";

function HoverCardA() {
    return (
        <Tilt
            className="max-w-[160px] absolute top-1/2 right-1/3 z-10"
            scale={1.5}
            transitionSpeed={2500}
        >
            <Card className="p-1 flex items-center gap-1 max-w-[170px] animate-float pr-2">
                <Image
                    src="/assets/hover-card-images/sicilian-pizza.png"
                    width={50}
                    height={50}
                    alt="new york pizza image"
                    className="object-cover rounded-full"
                />
                <div>
                    <h6 className="text-sm font-bold">Sicilian Pizza</h6>
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
            className="max-w-[160px] absolute top-1/3 z-10 "
            scale={1.5}
            transitionSpeed={2500}
        >
            <Card className="p-1 flex items-center gap-1 max-w-[170px] animate-float pr-2">
                <Image
                    src="/assets/hover-card-images/roman-pizza.png"
                    width={50}
                    height={50}
                    alt="new york pizza image"
                    className="object-cover rounded-full"
                />
                <div>
                    <h6 className="text-sm font-bold">Roman pizza</h6>
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
            className="max-w-[160px] absolute left-1/2 top-1/4 z-10"
            scale={1.5}
            transitionSpeed={2500}
        >
            <Card className="p-1 flex items-center gap-1 max-w-[170px] animate-float pr-2">
                <Image
                    src="/assets/hover-card-images/burger.png"
                    width={50}
                    height={50}
                    alt="new york pizza image"
                    className="object-cover rounded-full"
                />
                <div>
                    <h6 className="text-sm font-bold">Ham Burger</h6>
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
        <div className="relative">
            <HoverCardA />
            <HoverCardB />
            <HoverCardC />

            <Image
                src="/hero.png"
                alt="hero image"
                height={550}
                width={550}
                className="spinner"
            />
        </div>
    );
}
