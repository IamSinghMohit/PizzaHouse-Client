import { TUserSchema } from "@/schema/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
    user: TUserSchema ;
}

function ProfileButton({ user }: Props) {
    return (
        <Avatar>
            <AvatarImage src={user.avatar} alt="user image" />
            <AvatarFallback>
                {user.first_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}

export default ProfileButton;
