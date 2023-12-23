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
import { Button } from "@/Components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../../images/J&T_Express_logo.svg";
import { router } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";

const EditCourier: FC<any> = (props: any) => {
    const formSchema = z.object({
        full_name: z.string().refine((val) => val.length > 0, {
            message: "Nama tidak boleh kosong",
        }),
        username: z.string().refine((val) => val.length > 0, {
            message: "Nama pengguna tidak boleh kosong",
        }),
        password: z.string().refine((val) => val.length > 0, {
            message: "Kata sandi tidak boleh kosong",
        }),
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Layout
                title={props.title}
                isAuthenticated={props.auth.user}
                description={props.description}
                disabled={!form.formState.isValid}
            >
                <Form {...form}>
                    <Card className="p-8 h-max w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                </Form>
            </Layout>{" "}
        </form>
    );
};

export default EditCourier;
