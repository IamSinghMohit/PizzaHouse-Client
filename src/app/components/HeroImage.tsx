"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { Card } from "@/components/ui/card";

function StartIcon({ width, height }: { width: number; height: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star-filled"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                strokeWidth="0"
                fill="currentColor"
            />
        </svg>
    );
}
function HoverCardA() {
    return (
        <Tilt className="max-w-[160px]" scale={1.5} transitionSpeed={2500}>
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
        <Tilt className="max-w-[160px]" scale={1.5} transitionSpeed={2500}>
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
        <Tilt className="max-w-[160px]" scale={1.5} transitionSpeed={2500}>
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
function GroupA() {
    return (
        <Tilt>
            <Image
                src="/assets/hero-image/group-1.svg"
                width={60}
                height={70}
                alt="hero image topings"
            />
        </Tilt>
    );
}
function GroupB() {
    return (
        <Tilt>
            <Image
                src="/assets/hero-image/group-2.svg"
                width={60}
                height={70}
                alt="hero image topings"
            />
        </Tilt>
    );
}
function GroupC() {
    return (
        <Tilt>
            <Image
                src="/assets/hero-image/group-3.svg"
                width={50}
                height={50}
                alt="hero image topings"
            />
        </Tilt>
    );
}

export default function HeroImage({}) {
    return (
        <div >
            {/* <div className="w-[120px] h-[120px] animate-float absolute top-[10px] left-[351px]">
                <GroupA />
            </div>
            <div className="w-[200px] h-[200px] absolute animate-float top-[59px] left-[249px]">
                <GroupB />
            </div>
            <div className="w-[200px] h-[200px] absolute animate-float top-[30px] left-[289px]">
                <GroupC />
            </div> */}
            <div className="absoltue flex flex-col gap-5 top-1 pt-8">
                <div className="self-end">
                    <HoverCardA />
                </div>
                <div className="self-start">
                    <HoverCardB />
                </div>
                <div className="self-center">
                    <HoverCardC />
                </div>
            </div>

            <Image
                src="/assets/hero-image/hero.png"
                alt="hero image"
                height={550}
                width={550}
                className=""
            />
        </div>
    );
}
