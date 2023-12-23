import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Header } from "@/Components/Header";
import { Button } from "@/Components/ui/button";
import { Layout } from "@/Layouts/Layout";
import { Link, router } from "@inertiajs/react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

const Couriers: FC<any> = (props: any) => {
    const columns: ColumnDef<any>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) =>
        //                 table.toggleAllPageRowsSelected(!!value)
        //             }
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "full_name",
            header: "Nama Lengkap",
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">{row.getValue("full_name")}</div>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Bergabung Pada",
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
                                    route("couriers.edit", row.original.id)
                                ),
                            icon: <IconEdit className="w-4 h-4" />,
                            label: "Edit",
                        },
                        {
                            onClick: () =>
                                router.delete(
                                    route("couriers.destroy", row.original.id)
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
            isAuthenticated={props.auth.user}
            description={props.description}
            subPageHref="couriers.create"
        >
            <DataTable
                data={props.couriers}
                columns={columns}
                search={{
                    placeholder: "Cari kurir berdasarkan nama lengkap...",
                    column: "full_name",
                }}
            />
        </Layout>
    );
};

export default Couriers;
