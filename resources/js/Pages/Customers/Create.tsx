import { FC } from "react";
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

const CreateCustomer: FC<any> = (props: any) => {
    const formSchema = z.object({
        name: z.string(),
        phone_number: z.string(),
        address: z.string(),
        address_distance: z.number(),
        item_name: z.string(),
        item_type: z.enum(["barang", "dokumen"]),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone_number: "",
            address: "",
            address_distance: 0,
            item_name: "",
            item_type: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("customers.store"), values);
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
                    <Card className="p-8 h-max w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 gap-4">
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
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                word.slice(1)
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
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>

                                    <FormControl>
                                        <Input
                                            className="rounded-full"
                                            placeholder="Masukkan alamat"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        .split(" ")
                                                        .map(
                                                            (word) =>
                                                                word
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                word.slice(1)
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
                            name="address_distance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jarak Alamat</FormLabel>

                                    <FormControl>
                                        <Input
                                            min={0}
                                            type="number"
                                            className="rounded-full"
                                            placeholder="Masukkan jarak alamat"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value)
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
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                word.slice(1)
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
                </Form>
            </ScrollArea>
        </Layout>
    );
};

export default CreateCustomer;
