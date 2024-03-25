"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {};

export default function Page({}: Props) {
    return (
        <MaxWidthWrapper>
            <Card>
                <CardHeader>
                    <CardTitle>Faq Page</CardTitle>
                    <CardDescription>
                        🔥There are two separte projects. It is one of them,
                        <a
                            href="https://mohit-nishad.vercel.app"
                            target="_blank"
                            className="text-blue-800 hover:underline"
                        >
                            {" "}
                            wanna know more{" "}
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-h-[315px] md:w-[560px] mb-10 mx-auto">
                        <h5 className="text-black font-bold text-md sm:text-xl">
                            Prefer watching a video😇
                        </h5>
                        <div className="relative pb-[56.25%] max-w-[560px] w-full h-0 max-h-[315px]">
                            <iframe
                                className="w-full h-full absolute top-0 left-0 max-h-[315px] max-w-[560px]"
                                src="https://www.youtube.com/embed/7N5AY56IN3s?si=clU-lmo0rdgeoXFm"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{
                                    aspectRatio: "16/9",
                                }}
                            />
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Why any database operations are not allowed ?
                            </AccordionTrigger>
                            <AccordionContent>
                                All my backend serverices are relying on free
                                tier and that's why i don't want to spoil any
                                thing. If i don't do this then i could get
                                charged unnecessarily
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Why UI is not that good ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Bro i am not a UI designer i am a engineer i
                                just built it from what i was able to come up
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Api's are not working or they are too slow
                            </AccordionTrigger>
                            <AccordionContent>
                                It could be due to that `render.com`,my hosting
                                provider will shutdown my server after some
                                inactivity and its reboot could take more
                                than 50 seconds.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </MaxWidthWrapper>
    );
}
