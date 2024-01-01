import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Button } from "@/Components/ui/button";
import { Layout } from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { IconDots, IconEdit, IconMap, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

const Customers: FC<any> = (props: any) => {
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
            accessorKey: "full_address_destination",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Alamat</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("full_address_destination")}
                </div>
            ),
        },
        {
            accessorKey: "phone_number",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">
                    Nomor Telepon
                </div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("phone_number")}
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">
                    Bergabung Pada
                </div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {new Date(row.getValue("created_at")).toLocaleString(
                        "id-ID",
                        {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                        }
                    )}
                </div>
            ),
        },
        {
            accessorKey: "updated_at",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">
                    Diperbarui Pada
                </div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {new Date(row.getValue("updated_at")).toLocaleString(
                        "id-ID",
                        {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                        }
                    )}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }: any) => (
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
                                    route("customers.show", row.original.id)
                                ),
                            icon: <IconMap className="w-4 h-4" />,
                            label: "Lihat Rute",
                        },
                        {
                            onClick: () =>
                                router.get(
                                    route("customers.edit", row.original.id)
                                ),
                            icon: <IconEdit className="w-4 h-4" />,
                            label: "Ubah",
                        },
                        {
                            onClick: () =>
                                router.delete(
                                    route("customers.destroy", row.original.id)
                                ),
                            icon: <IconTrash className="w-4 h-4" />,
                            label: "Hapus",
                            disabled: !!row.original.orders_count,
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
            subPageHref="customers.create"
        >
            <DataTable
                data={props.customers}
                columns={columns}
                search={{
                    placeholder: "Cari pelanggan berdasarkan nama...",
                    column: "name",
                }}
            />
        </Layout>
    );
};

export default Customers;
