import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Button } from "@/Components/ui/button";
import { Layout } from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
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
            accessorKey: "address",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Alamat</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("address")}
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
