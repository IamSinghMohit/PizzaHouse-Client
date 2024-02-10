"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React, { ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { StateAarray } from "@/data/state";
import {
    AssamCities,
    BiharCities,
    ChhattisgarhCities,
    GujratCities,
    HaryanaCities,
} from "@/data/cities";
import { useAppSelector } from "@/hooks/state";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, PencilLine } from "lucide-react";
import { UserDetailsSchema } from "../schema";

const getCitiesByState = (selectedState: string) => {
    switch (selectedState) {
        case "Gujrat":
            return GujratCities;
        case "Assam":
            return AssamCities;
        case "Bihar":
            return BiharCities;
        case "Haryana":
            return HaryanaCities;
        case "Chhattisgarh":
            return ChhattisgarhCities;
        default:
            return [];
    }
};

type Props = {};

export function ProfileForm({}: Props) {
    const { user } = useAppSelector((state) => state.user);
    const router = useRouter();
    let userData = {
        last_name: "",
        first_name: "",
        address: "",
        state: "",
        city: "",
    };
    try {
        userData = UserDetailsSchema.parse(
            JSON.parse(localStorage.getItem(user?.id)),
        );
    } catch (error) {
        console.log(error);
    }
    const form = useForm({
        resolver: zodResolver(UserDetailsSchema),
        defaultValues: userData,
    });
    const selectedState = form.watch("state");

    function onSubmit(data: any) {
        localStorage.setItem(user.id, JSON.stringify(data));
    }

    return (
        <div className="flex items-center flex-col">
            <Avatar className="w-[120px] h-[120px]">
                <AvatarImage src={user.avatar} alt="user image" />
                <AvatarFallback>
                    {user.first_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-normal  sm:flex-nowrap">
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
                    <div className="flex items-center gap-2 justify-center flex-wrap sm:justify-normal sm:flex-nowrap">
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select your state" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {StateAarray.map((item) => (
                                                <SelectItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        disabled={!selectedState}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select your city" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {getCitiesByState(
                                                selectedState,
                                            ).map((item) => (
                                                <SelectItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter your address"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                        <Button type="submit" className="rounded-xl text-xl">
                            Save
                            <PencilLine className="ml-1" />
                        </Button>
                        <Button className="text-lg rounded-xl">
                            Logout
                            <LogOut className="ml-1" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
export function ProfileWrapper({ children }: { children: ReactNode }) {
    return (
        <Card className="p-4 rounded-sm max-w-[400px] mx-auto">{children}</Card>
    );
}
