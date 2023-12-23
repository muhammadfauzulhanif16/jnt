import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Header } from "@/Components/Header";
import { Button } from "@/Components/ui/button";
import { Layout } from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

const Couriers: FC<any> = (props: any) => {
    console.log(props.couriers);
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
                <div className="capitalize">{row.getValue("full_name")}</div>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Bergabung Pada",
            cell: ({ row }) => (
                <div className="capitalize">
                    {new Date(row.getValue("created_at")).toLocaleString()}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original;

                return (
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
                            <Link
                                key="edit"
                                href={route("couriers.edit", payment.id)}
                                className="flex items-center gap-2"
                            >
                                <IconEdit className="w-4 h-4" />
                                <span>Edit</span>
                            </Link>,
                            <Link
                                key="delete"
                                href={route("couriers.destroy", payment.id)}
                                method="delete"
                                as="button"
                                className="flex items-center gap-2"
                            >
                                <IconTrash className="w-4 h-4" />
                                <span>Hapus</span>
                            </Link>,
                        ]}
                    />
                );
            },
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
