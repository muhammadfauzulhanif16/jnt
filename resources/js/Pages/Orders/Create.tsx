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
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Combobox } from "@/Components/Combobox";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Button } from "@/Components/ui/button";
import { IconTrash } from "@tabler/icons-react";

const CreateOrder: FC<any> = (props: any) => {
    const formSchema = z.object({
        customer_id: z.string(),
        status: z.enum(["siap dikirim", "belum siap dikirim"]),
        items: z.array(
            z.object({
                receipt_number: z.string(),
            })
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_id: "",
            status: undefined,
            items: [
                {
                    receipt_number: "",
                },
            ],
        },
    });

    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control: form.control,
            name: "items",
        });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("orders.store"), values);
    }

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            disabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
            mainPageHref="orders.index"
        >
            <ScrollArea className="w-full">
                <Form {...form}>
                    <div className="flex flex-col gap-4">
                        <Card className="p-8 h-max w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="customer_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pelanggan</FormLabel>

                                        <FormControl>
                                            <Combobox
                                                commandItemProps={field}
                                                placeholder="pelanggan"
                                                options={props.customers}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>

                                        <FormControl>
                                            <Combobox
                                                commandItemProps={field}
                                                placeholder="status"
                                                options={[
                                                    {
                                                        value: "siap dikirim",
                                                        label: "Siap Dikirim",
                                                    },
                                                    {
                                                        value: "belum siap dikirim",
                                                        label: "Belum Siap Dikirim",
                                                    },
                                                ]}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>

                        <Card className="p-8 h-max w-full flex flex-col gap-4">
                            <FormLabel>Nomor Resi</FormLabel>

                            <div className="flex flex-col gap-2">
                                {fields.map((_, index) => (
                                    <FormField
                                        key={index}
                                        control={form.control}
                                        name={
                                            `items.${index}.receipt_number` as const
                                        }
                                        render={({ field }) => (
                                            <FormItem className="flex gap-2 space-y-0">
                                                <FormControl>
                                                    <Input
                                                        className="rounded-full"
                                                        {...field}
                                                        placeholder={`Masukkan nomor resi ${
                                                            index + 1
                                                        }`}
                                                    />
                                                </FormControl>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        remove(index);
                                                    }}
                                                    className="rounded-full flex-none text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                                                >
                                                    <IconTrash className="w-4 h-4" />
                                                </Button>

                                                <FormMessage className="m-0" />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>

                            <Button
                                onClick={(e) => {
                                    e.preventDefault();

                                    append({
                                        receipt_number: "",
                                    });
                                }}
                                className="rounded-full"
                            >
                                Tambah Nomor Resi
                            </Button>
                        </Card>
                    </div>
                </Form>
            </ScrollArea>
        </Layout>
    );
};

export default CreateOrder;
