'use client'

import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/icons";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, SigninnSchema, TSigninSchema } from "@/schema/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Facebook} from "lucide-react";

type Props = {};

export function LoginForm({}: Props) {
    const [register, setRegister] = useState(false);
    const form = useForm<TSigninSchema>({
        resolver: zodResolver(
            (() => (register ? SigninnSchema : LoginSchema))(),
        ),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: any) {
        console.log(data);
    }

    function handleGoogleClick() {
        window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`, "_self");
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {register && (
                    <div className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <span
                        className="ml-auto mt-3 underline text-black hover:text-primary_orange cursor-pointer"
                        onClick={() => setRegister((prev) => !prev)}
                    >
                        {register ? "login" : "Sign in"}
                    </span>
                    <div className="flex items-center gap-1 justify-center">
                        <Separator className="w-1/2" />
                        OR
                        <Separator className="w-1/2" />
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Button
                            className="text-white text-[25px] gap-2"
                            onClick={handleGoogleClick}
                            type="button"
                        >
                            <GoogleIcon />
                            <span className="text-[16px] font-light">
                                Google
                            </span>
                        </Button>
                        <Separator
                            orientation="vertical"
                            className="h-[36px]"
                        />
                        <Button
                            className="text-white text-[25px]"
                            type="button"
                        >
                            <Facebook/>
                            <span className="text-[16px] font-light">
                                Facebook
                            </span>
                        </Button>
                    </div>
                </div>
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
}

export function LoginWrapper({ children }: { children: ReactNode }) {

    return (
        <Card className={`flex flex-col max-w-[310px] p-4 mx-auto mt-2 rounded-sm`}>
            {children}
        </Card>
    );
}
