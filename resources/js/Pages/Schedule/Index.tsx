import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Layout } from "@/Layouts/Layout";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
    IconCalendar,
    IconCheck,
    IconDots,
    IconEdit,
    IconEye,
    IconMap,
    IconPackage,
    IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

const Schedule: FC<any> = (props: any) => {
    const items = (row: any) => {
        let _items = [
            {
                onClick: () =>
                    router.get(
                        route("customers.show", row.original.customer_id)
                    ),
                icon: <IconMap className="w-4 h-4" />,
                label: "Lihat Rute",
            },
            {
                onClick: () =>
                    router.get(route("orders.show", row.original.order_id), {
                        customer_id: row.original.customer_id,
                    }),
                icon: <IconPackage className="w-4 h-4" />,
                label: "Rincian Barang",
            },
        ];

        if (
            row.original.status === "belum dipickup" &&
            props.auth.user.role === "courier"
        ) {
            _items.push({
                onClick: () =>
                    router.put(route("orders.update", row.original.order_id), {
                        status: "sudah dipickup",
                    }),
                icon: <IconCheck className="w-4 h-4" />,
                label: "Sudah Dipickup",
            });
        }

        return _items;
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "customer_name",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">
                    Nama Pelanggan
                </div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("customer_name")}
                </div>
            ),
        },
        {
            accessorKey: "items_count",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Total Barang</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("items_count")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Status</div>
            ),
            cell: ({ row }: any) => (
                <Badge
                    className={cn(
                        "capitalize whitespace-nowrap",
                        row.getValue("status").includes("belum")
                            ? "bg-red-500 hover:bg-red-500"
                            : "bg-green-500 hover:bg-green-500"
                    )}
                >
                    {row.getValue("status")}
                </Badge>
            ),
        },
        {
            accessorKey: "courier_name",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Nama Kurir</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("courier_name")}
                </div>
            ),
        },
        {
            accessorKey: "scheduling_time",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Waktu Pickup</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("scheduling_time")}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => (
                <DropdownMenu
                    trigger={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                        >
                            <IconDots />
                        </Button>
                    }
                    label="Aksi"
                    items={items(row)}
                />
            ),
        },
    ];

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            mainPageHref="schedule.show"
        >
            <Tabs
                defaultValue="belum dipickup"
                className="w-full flex flex-col gap-2"
            >
                <TabsList className="grid w-full grid-cols-2 rounded-full">
                    <TabsTrigger
                        value="belum dipickup"
                        className="rounded-full"
                    >
                        Belum Dipickup
                    </TabsTrigger>
                    <TabsTrigger
                        value="sudah dipickup"
                        className="rounded-full"
                    >
                        Sudah Dipickup
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="belum dipickup" className="grow h-0">
                    <DataTable
                        data={props.order_has_not_been_picked_up}
                        columns={columns}
                        search={{
                            placeholder:
                                "Cari pesanan berdasarkan pelanggan...",
                            column: "customer_name",
                        }}
                    />
                </TabsContent>

                <TabsContent value="sudah dipickup" className="grow h-0">
                    <DataTable
                        data={props.order_has_been_picked_up}
                        columns={columns}
                        search={{
                            placeholder:
                                "Cari pesanan berdasarkan pelanggan...",
                            column: "customer_name",
                        }}
                    />
                </TabsContent>
            </Tabs>
        </Layout>
    );
};

export default Schedule;
