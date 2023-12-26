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

const LogIn: FC<any> = (props: any) => {
    const formSchema = z.object({
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
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("login"), values);
    }

    return (
        <Layout title={props.title} authenticated={props.auth.user}>
            <img src={Logo} alt="Logo" className="w-40 mb-4" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full sm:w-3/4 md:w-2/4 lg:w-1/4 flex flex-col gap-4 "
                >
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

                    <Button
                        type="submit"
                        className="rounded-full"
                        disabled={!form.formState.isValid}
                    >
                        Masuk
                    </Button>
                </form>
            </Form>
        </Layout>
    );
};

export default LogIn;
