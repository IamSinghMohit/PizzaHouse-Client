import { Button } from "@/components/ui/button";
import { CircleUserRound} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog";
import Login from "@/app/(.)login/page";

export function LoginWithButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" className="rounded-full">
                    <CircleUserRound />
                </Button>
            </DialogTrigger>
            <DialogOverlay className="bg-transparent border" />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <Login searchParams={{with_layout:''}}/>
            </DialogContent>
        </Dialog>
    );
}
