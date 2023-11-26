"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./ui/dropdown-menu";
interface Props {}

export default function Navbar({}: Props) {
    return (
        <nav className="navbar sticky top-0">
            <MaxWidthWrapper className="flex items-center justify-between py-2">
                <div className="w-[120px] h-9 relative">
                    <Image src="/logo.svg" alt="logo image" layout="fill" />
                </div>
                {/* <div className="flex items-center font-bold font-inter gap-2">
                    <Link
                        href={"/products"}
                        className="hover:text-primary_orange"
                    >
                        Products
                    </Link>{" "}
                    <Link href={"/"} className="hover:text-primary_orange">
                        Home
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="lskdjf" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </div> */}
            </MaxWidthWrapper>
        </nav>
    );
}
