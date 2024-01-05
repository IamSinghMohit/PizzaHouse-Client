import { Button } from "@/components/ui/button";
import { CircleUserRound, FacebookIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

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
import { useForm } from "react-hook-form";
import {
    LoginSchema,
    SigninnSchema,
    TLoginSchema,
    TSigninSchema,
} from "@/schema/base/auth";
import { ZodType } from "zod";

export function LoginWithButton() {
    const [register, setRegister] = useState(false);

    const form = useForm<TSigninSchema>({
        resolver: zodResolver(
            (() => (register ? SigninnSchema : LoginSchema))()
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: any) {
        console.log(data);
    }

    function handleGoogleClick() {
        window.open("http://localhost:3001/auth/login/google","_self");
    }

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
                <div className="flex flex-col">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {register && (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                    <Button className="text-white text-[25px]" type="button">
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
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
