import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Search, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/hooks/state";
import { LoginWithButton } from "../LoginWithButton";
import ProfileButton from "../ProfileButton";
interface Props {}

export default function DesktopMenu({}: Props) {
    const { user } = useAppSelector((state) => state.user);
    return (
        <div className="flex items-center font-bold font-inter gap-2">
            <Link href={"/products"}>
                <Button size="icon">
                    <Search />
                </Button>
            </Link>{" "}
            <Link href={"/cart"}>
                <Button size="icon">
                    <ShoppingCart />
                </Button>
            </Link>{" "}
            {user ? (
            <ProfileButton user={user}/>
            ) : (
                <LoginWithButton />
            )}
        </div>
    );
}
