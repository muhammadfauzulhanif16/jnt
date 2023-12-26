import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Layout } from "@/Layouts/Layout";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import {
    IconCalendar,
    IconDots,
    IconEdit,
    IconEye,
    IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useState } from "react";

const Schedule: FC<any> = (props: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "customer_name",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Nama Pelanggan</div>
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
                <div className="capitalize whitespace-nowrap">
                   Waktu Pickup
                </div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {new Date(row.getValue("scheduling_time")).toLocaleDateString()}
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
                    items={[
                        {
                            onClick: () =>
                                router.get(
                                    route("orders.show", row.original.order_id),
                                    {
                                        customer_id: row.original.customer_id,
                                    }
                                ),
                            icon: <IconEye className="w-4 h-4" />,
                            label: "Rincian Barang",
                        },
                        // {
                        //     onClick: () =>
                        //         router.get(
                        //             route("schedule.create", {
                        //                 customer_id: row.original.customer_id,
                        //             }),
                        //             {
                        //                 order_id: row.original.order_id,
                        //             }
                        //         ),
                        //     icon: <IconCalendar className="w-4 h-4" />,
                        //     label: "Jadwalkan",
                        //     disabled:
                        //         row.original.status === "belum siap dikirim",
                        // },
                    ]}
                />
            ),
        },
    ];

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
        >
            <DataTable
                data={props.customers}
                columns={columns}
                search={{
                    placeholder: "Cari pesanan berdasarkan pelanggan...",
                    column: "customer_name",
                }}
            />
        </Layout>
    );
};

export default Schedule;
