import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAppSelector } from "@/hooks/state";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {}

function MBNavLink({
    text,
    icon,
    href,
}: {
    text: string;
    icon: React.ReactNode;
    href: string;
}) {
    return (
        <Link
            className="active:text-primary_orange flex items-center gap-1 hover:underline text-lg"
            href={href}
        >
            {text}
            <span className="active:text-white">{icon}</span>
        </Link>
    );
}

export default function MobileMenu({}: Props) {
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const { ids } = useAppSelector((state) => state.cart);
    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e)}>
            <Dialog.Trigger asChild>
                <Button
                    size="icon"
                    onClick={() => setOpen((prev) => !prev)}
                    className={`z-30 relative ${
                        open && "invisible"
                    } rounded-full`}
                >
                    <Menu strokeWidth={3} />
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="nav-blur fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-3/4  data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm">
                    <Dialog.Close asChild>
                        <button
                            onClick={() => setOpen((prev) => !prev)}
                            className={`z-30 bg-transparent`}
                        >
                            <X strokeWidth={1.8} size={34} />
                        </button>
                    </Dialog.Close>

                    <div className="flex flex-col items-center justify-start gap-6 pt-8">
                        <Dialog.Close asChild>
                            <MBNavLink
                                text="Product"
                                icon={<Search width={28} height={28} />}
                                href="/product"
                            />
                        </Dialog.Close>

                        <Dialog.Close asChild>
                            <MBNavLink
                                text="Cart"
                                icon={(() => (
                                    <div className="relative">
                                        <ShoppingCart width={28} height={28} />
                                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[12px] font-light flex items-center justify-center">
                                            {ids.length}
                                        </span>
                                    </div>
                                ))()}
                                href="/cart"
                            />
                        </Dialog.Close>

                        <Dialog.Close asChild>
                            {user ? (
                                <div className="flex items-center gap-1">
                                    <Avatar>
                                        <AvatarImage
                                            src={user.avatar}
                                            alt="user image"
                                        />
                                        <AvatarFallback>
                                            {user.first_name
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{user.first_name}</span>
                                </div>
                            ) : (
                                <MBNavLink
                                    text="Login/Sign up"
                                    icon={<CircleUserRound />}
                                    href="/login?with_layout=true"
                                />
                            )}
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
