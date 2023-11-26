'use client'
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
interface Props {}

export default function Navbar({}: Props) {
    return (
        <nav className="navbar flex items-center justify-between sticky top-0 p-2">
            <Image src="/logo.svg" alt="logo image" width={200} height={400} />
            <div className="flex items-center font-bold font-inter">
                <Link href={"/products"} className="hover:text-primary_orange">
                    Products
                </Link>{" "}
                <Link href={"/"} className="hover:text-primary_orange">
                    Home
                </Link>
                <Avatar>
                    <AvatarImage src="lskdjf" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
}
