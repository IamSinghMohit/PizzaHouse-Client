import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
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

export function LoginWithButton() {
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
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="name..."
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="pas..."
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
