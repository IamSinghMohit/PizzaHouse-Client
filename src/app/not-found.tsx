import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
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
                    <Button className="rounded-xl text-xl">
                        Back to{" "}
                        <span className="ml-1">
                            <Home />
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
