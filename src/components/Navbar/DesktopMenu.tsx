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
                            <AvatarImage src={user.avatar} alt="user image" />
                            <AvatarFallback>
                                {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
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
                <LoginWithButton/>
            )}
        </div>
    );
}
