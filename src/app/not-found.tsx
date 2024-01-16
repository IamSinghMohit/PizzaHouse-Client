import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function notFound({}: Props) {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Image
                    src="/404-image.png"
                    width={450}
                    height={400}
                    alt="not found image"
                />

                <Link href="/">
                    <Button>Back to home</Button>
                </Link>
            </div>
        </div>
    );
}
