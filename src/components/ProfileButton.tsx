import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TuserSchema } from "@/schema/base/auth";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface Props {
    user: TuserSchema;
}

function ProfileButton({ user }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar>
                    <AvatarImage src={user.avatar} alt="user image" />
                    <AvatarFallback>
                        {/* {user.name.slice(0, 2).toUpperCase()} */}
                        {user.name}
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value="@peduarte"
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

export default ProfileButton;
