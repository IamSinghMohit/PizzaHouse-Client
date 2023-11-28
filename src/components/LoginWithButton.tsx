import { Button } from "@/components/ui/button";
import { CircleUserRound, FacebookIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { GoogleIcon } from "@/icons";
import { useState } from "react";

export function LoginWithButton() {
    const [register, setRegister] = useState(false);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" className="rounded-full bg-primary_orange">
                    <CircleUserRound />
                </Button>
            </DialogTrigger>
            <DialogOverlay className="bg-transparent border" />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{register ? "Sign in" : "login"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {register && (
                        <div className="">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="email" className="col-span-3" />
                        </div>
                    )}
                    <div className="">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" className="col-span-3" />
                    </div>
                    <div className="">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input id="password" className="col-span-3" />
                    </div>
                    <span
                        className="self-end underline text-primary_orange"
                        onClick={() => setRegister((prev) => !prev)}
                    >
                        {register ? "login" : "Sign in"}
                    </span>
                    <div className="flex items-center gap-1 justify-center">
                        <Separator className="w-1/2" />
                        OR
                        <Separator className="w-1/2" />
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                        <Button className="text-white text-[25px] gap-2">
                            <GoogleIcon />
                            <span className="text-[16px] font-light">
                                Google
                            </span>
                        </Button>
                        <Separator orientation="vertical" />
                        <Button className="text-white text-[25px]">
                            <FacebookIcon strokeWidth={1} />
                            <span className="text-[16px] font-light">
                                Facebook
                            </span>
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Login</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
