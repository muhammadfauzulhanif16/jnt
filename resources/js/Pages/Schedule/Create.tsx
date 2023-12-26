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
import { DatePicker } from "@/Components/DatePicker";

const CreateSchedule: FC<any> = (props: any) => {
    const formSchema = z.object({
        order_id: z.string(),
        courier_id: z.string(),
        scheduling_time: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order_id: props.order_id,
            courier_id: "",
            scheduling_time: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("schedule.store"), values);
    }

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            disabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
            mainPageHref="schedule.index"
        >
            <ScrollArea className="w-full">
                <Form {...form}>
                    <div className="flex flex-col gap-4">
                        <Card className="p-8 h-max w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="scheduling_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Waktu</FormLabel>

                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onSelect={(value: any) => {
                                                    field.onChange(
                                                        value.toISOString()
                                                    );
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="courier_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kurir</FormLabel>

                                        <FormControl>
                                            <Combobox
                                                commandItemProps={field}
                                                placeholder="kurir"
                                                options={props.couriers}
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

export default CreateSchedule;
