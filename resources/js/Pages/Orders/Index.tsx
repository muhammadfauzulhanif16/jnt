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
    IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

const Orders: FC<any> = (props: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Nama</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("name")}
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
            accessorKey: "created_at",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Dibuat Pada</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {new Date(row.getValue("created_at")).toLocaleString()}
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
                                    route("orders.edit", row.original.order_id)
                                ),
                            icon: <IconCalendar className="w-4 h-4" />,
                            label: "Jadwalkan",
                            disabled:
                                row.original.status === "belum siap dikirim",
                        },
                        {
                            onClick: () =>
                                router.get(
                                    route("orders.edit", row.original.order_id)
                                ),
                            icon: <IconEdit className="w-4 h-4" />,
                            label: "Ubah",
                        },
                        {
                            onClick: () =>
                                router.delete(
                                    route(
                                        "orders.destroy",
                                        row.original.order_id
                                    )
                                ),
                            icon: <IconTrash className="w-4 h-4" />,
                            label: "Hapus",
                        },
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
            subPageHref="orders.create"
        >
            <DataTable
                data={props.customers}
                columns={columns}
                search={{
                    placeholder: "Cari pesanan berdasarkan pelanggan...",
                    column: "name",
                }}
            />
        </Layout>
    );
};

export default Orders;
