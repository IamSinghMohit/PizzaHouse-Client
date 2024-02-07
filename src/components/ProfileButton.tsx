import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TuserSchema } from "@/schema/base/auth";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Profile from "@/app/(.)profile/page";

interface Props {
    user: TuserSchema;
}

function ProfileButton({ user }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} alt="user image" />
                    <AvatarFallback>
                        {user?.first_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <Profile searchParams={{ with_layout: "" }} />
            </DialogContent>
        </Dialog>
    );
}

export default ProfileButton;
