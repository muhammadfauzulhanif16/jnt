import { FC } from "react";
import { Layout } from "@/Layouts/Layout";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
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

const CreateCourier: FC<any> = (props: any) => {
    const formSchema = z.object({
        full_name: z.string().refine((val) => val.length > 0, {
            message: "Nama tidak boleh kosong",
        }),
        username: z
            .string()
            .refine((val) => val.length > 0, {
                message: "Nama pengguna tidak boleh kosong",
            })
            .refine(
                (val) => {
                    const regexPattern = /^[a-zA-Z0-9]+$/;
                    const isRegexMatch = regexPattern.test(val);
                    const isUsernameExists = props.couriers.some(
                        (courier: any) => courier.username === val
                    );
                    return isRegexMatch && !isUsernameExists;
                },
                {
                    message: "Nama pengguna tidak sah atau sudah digunakan",
                }
            ),
        password: z.string().refine((val) => val.length > 0, {
            message: "Kata sandi tidak boleh kosong",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("couriers.store"), values);
    }

    return (
        <Layout
            title={props.title}
            isAuthenticated={props.auth.user}
            description={props.description}
            // disabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
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

                                <FormDescription>
                                    Nama pengguna harus unik, hanya mengandung huruf dan angka.
                                </FormDescription>

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
        </Layout>
    );
};

export default CreateCourier;
