import { FC, useEffect, useState } from "react";
import { Layout } from "@/Layouts/Layout";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Combobox } from "@/Components/Combobox";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { MapContainer, TileLayer } from "react-leaflet";
import { AspectRatio } from "@/Components/ui/aspect-ratio";
import { Map } from "@/Components/Map";

const EditCustomer: FC<any> = (props: any) => {
    const [startingPointAddress, setStartingPointAddress] = useState({
        latitude: props.customer.start_lat || 0,
        longitude: props.customer.start_long || 0,
    });

    const [destinationAddress, setDestinationAddress] = useState({
        latitude: props.customer.dest_lat || 0,
        longitude: props.customer.dest_long || 0,
        total_distance: props.customer.dest_total_distance || "",
        total_time: props.customer.dest_total_time || "",
    });

    const formSchema = z.object({
        name: z.string(),
        phone_number: z.string(),
        full_address_destination: z.string(),
        start_lat: z.number(),
        start_long: z.number(),
        dest_lat: z.number(),
        dest_long: z.number(),
        dest_total_distance: z.string(),
        dest_total_time: z.string(),
        item_name: z.string(),
        item_type: z.enum(["barang", "dokumen"]),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.customer.name || "",
            phone_number: props.customer.phone_number || "",
            full_address_destination:
                props.customer.full_address_destination || "",
            start_lat: startingPointAddress.latitude,
            start_long: startingPointAddress.longitude,
            dest_lat: destinationAddress.latitude,
            dest_long: destinationAddress.longitude,
            dest_total_distance: destinationAddress.total_distance,
            dest_total_time: destinationAddress.total_time,
            item_name: props.customer.item_name || "",
            item_type: props.customer.item_type || undefined,
        },
    });

    useEffect(() => {
        form.reset({
            ...form.getValues(),
            start_lat: startingPointAddress.latitude,
            start_long: startingPointAddress.longitude,
            dest_lat: destinationAddress.latitude,
            dest_long: destinationAddress.longitude,
            dest_total_distance: destinationAddress.total_distance,
            dest_total_time: destinationAddress.total_time,
        });
    }, [startingPointAddress, destinationAddress, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.put(route("customers.update", props.customer.id), values);
    }

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            disabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
            mainPageHref="customers.index"
        >
            <ScrollArea className="w-full">
                <Form {...form}>
                    <div className="flex flex-col w-full gap-4">
                        <Card className="p-8 h-max w-full gap-4 grid grid-cols-1 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="whitespace-nowrap">
                                            Nama
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                className="rounded-full"
                                                placeholder="Masukkan nama"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            .split(" ")
                                                            .map(
                                                                (word) =>
                                                                    word
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                    word.slice(
                                                                        1
                                                                    )
                                                            )
                                                            .join(" ")
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nomor Telepon</FormLabel>

                                        <FormControl>
                                            <Input
                                                min={0}
                                                type="number"
                                                className="rounded-full"
                                                placeholder="Masukkan nomor telepon"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="full_address_destination"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Alamat Lengkap</FormLabel>

                                        <FormControl>
                                            <Input
                                                className="rounded-full"
                                                placeholder="Masukkan alamat lengkap"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            .split(" ")
                                                            .map(
                                                                (word) =>
                                                                    word
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                    word.slice(
                                                                        1
                                                                    )
                                                            )
                                                            .join(" ")
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-2">
                                <AspectRatio ratio={16 / 9}>
                                    <MapContainer
                                        center={[
                                            -11.0086 + 6.0779 / 2,
                                            95.0129 + 141.0197 / 2,
                                        ]}
                                        zoom={16}
                                        scrollWheelZoom
                                        className="w-full h-full rounded-[20px]"
                                    >
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                        <Map
                                            startingPointAddress={
                                                startingPointAddress
                                            }
                                            destinationAddress={
                                                destinationAddress
                                            }
                                            setStartingPointAddress={
                                                setStartingPointAddress
                                            }
                                            setDestinationAddress={
                                                setDestinationAddress
                                            }
                                        />
                                    </MapContainer>
                                </AspectRatio>
                            </div>
                        </Card>

                        <Card className="p-8 h-max w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="item_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Barang</FormLabel>

                                        <FormControl>
                                            <Input
                                                className="rounded-full"
                                                placeholder="Masukkan nama barang"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            .split(" ")
                                                            .map(
                                                                (word) =>
                                                                    word
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                    word.slice(
                                                                        1
                                                                    )
                                                            )
                                                            .join(" ")
                                                    )
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="item_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipe Barang</FormLabel>

                                        <FormControl>
                                            <Combobox
                                                commandItemProps={field}
                                                placeholder="tipe barang"
                                                options={[
                                                    {
                                                        value: "barang",
                                                        label: "Barang",
                                                    },
                                                    {
                                                        value: "dokumen",
                                                        label: "Dokumen",
                                                    },
                                                ]}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>
                    </div>
                </Form>
            </ScrollArea>
        </Layout>
    );
};

export default EditCustomer;
