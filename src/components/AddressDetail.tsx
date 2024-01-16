"use client";

import React, { useState } from "react";
import {
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogTrigger,
    DialogContent,
} from "./ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Check, ClipboardList } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { StateAarray } from "@/data/state";
import {
    AssamCities,
    BiharCities,
    ChhattisgarhCities,
    GujratCities,
    HaryanaCities,
} from "@/data/cities";
import { useAppSelector } from "@/hooks/state";
import useCreateOrder from "@/hooks/useCreateOrder";

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

function AddressDetail({ id }: { id: string }) {
    const [modalOpen, setModalOpen] = useState(false);
    const { mutate } = useCreateOrder();
    const entity = useAppSelector((state) => state.cart.entities[id]);
    const user = useAppSelector((state) => state.user.user);
    const form = useForm({
        // resolver: zodResolver(
        //     (() => (register ? SigninnSchema : LoginSchema))()
        // ),
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
        },
    });
    const selectedState = form.watch("state");

    function onSubmit(data: any) {
        setModalOpen(false);
        const body = {
            first_name:data.firstName,
            last_name:data.lastName,
            state:data.state,
            city:data.city,
            address:data.address,
            product_id: entity?.product_id,
            price: entity?.price,
            topings: entity?.topings.map((top) => top.id),
            product_sections: entity?.product_sections,
        };
        // mutate(body);
        console.log(body)
    }
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary_orange flex items-center gap-1">
                    <span>
                        <ClipboardList />
                    </span>
                    Place Order
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Varify your address</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
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
                                    name="lastName"
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
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select your state" />{" "}
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
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="flex items-center gap-1"
                                >
                                    <span>
                                        <Check />
                                    </span>
                                    OK
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddressDetail;
