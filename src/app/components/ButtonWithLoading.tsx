import { Button } from "@/components/ui/button";
import { SpinnerIcon } from "@/icons";
import React, { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean;
    icon?: ReactNode;
    type?: "submit" | "reset" | "button";
};

function ButtonWithLoading({
    isLoading,
    children,
    icon,
    type,
    ...other
}: Props) {
    return (
        <Button
            className="text-lg rounded-lg w-full sm:w-auto"
            type={type}
            {...other}
            disabled={isLoading}
        >
            <span className="mr-1">{isLoading ? <SpinnerIcon /> : icon}</span>
            {children}
        </Button>
    );
}

export default ButtonWithLoading;
