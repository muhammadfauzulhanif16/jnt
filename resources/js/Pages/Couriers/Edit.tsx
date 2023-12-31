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

const EditCourier: FC<any> = (props: any) => {
    const formSchema = z.object({
        full_name: z.string(),
        username: z.string(),
        password: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: props.courier.full_name || "",
            username: props.courier.username || "",
            password: props.courier.password || "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.put(route("couriers.update", props.courier.id), values);
    }

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            disabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
            mainPageHref="couriers.index"
        >
            <Form {...form}>
                <div className="flex flex-col w-full gap-4">
                    <Card className="p-8 h-max w-full">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel>Nama Lengkap</FormLabel>

                                    <FormControl>
                                        <Input
                                            className="rounded-full"
                                            placeholder="Masukkan nama lengkap"
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
                    </Card>

                    <Card className="p-8 h-max w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Pengguna</FormLabel>

                                    <FormControl>
                                        <Input
                                            className="rounded-full"
                                            placeholder="Masukkan nama pengguna"
                                            {...field}
                                        />
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
                                    <FormLabel>Kata Sandi</FormLabel>

                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="rounded-full"
                                            placeholder="Masukkan kata sandi"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Card>
                </div>
            </Form>
        </Layout>
    );
};

export default EditCourier;
