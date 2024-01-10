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
import { TuserSchema } from "@/schema/base/auth";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Check } from "lucide-react";
import { Textarea } from "./ui/textarea";

import { useForm } from "react-hook-form";
import Image from "next/image";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "./ui/select";
import { StateAarray } from "@/data/state";
import {
    AssamCities,
    BiharCities,
    ChhattisgarhCities,
    GujratCities,
    HaryanaCities,
} from "@/data/cities";
interface Props {
    user: TuserSchema;
}

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
function ProfileButton({ user }: Props) {
    const [register, setRegister] = useState(false);

    const form = useForm({
        // resolver: zodResolver(
        //     (() => (register ? SigninnSchema : LoginSchema))()
        // ),
        defaultValues: {
            first_name: "",
            last_name: "",
            address: "",
            state: "",
            city: "",
        },
    });
    const selectedState = form.watch("state");
    function onSubmit(data: any) {
        localStorage.setItem(user.id,JSON.stringify(data));
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} alt="user image" />
                    <AvatarFallback>
                        {user.first_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="flex items-center ">
                    <div className="bg-gray-50 rounded-lg">
                        <Image
                            src={user.avatar!}
                            width={120}
                            height={120}
                            alt="user image"
                        />
                        <span>{user.first_name + " " + user.last_name}</span>
                    </div>

                    <div className="flex flex-col">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
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
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select your state" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {StateAarray.map(
                                                            (item) => (
                                                                <SelectItem
                                                                    value={
                                                                        item.id
                                                                    }
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </SelectItem>
                                                            ),
                                                        )}
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
                                                    onValueChange={
                                                        field.onChange
                                                    }
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
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileButton;
