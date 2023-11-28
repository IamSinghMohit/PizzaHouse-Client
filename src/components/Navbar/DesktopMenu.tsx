import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/hooks/state";
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="lskdjf" alt="@shadcn" />
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button size="icon" className="rounded-full bg-primary_orange">
                    <CircleUserRound />
                </Button>
            )}
        </div>
    );
}
