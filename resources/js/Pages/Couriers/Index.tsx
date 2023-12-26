import { DataTable } from "@/Components/DataTable";
import { DropdownMenu } from "@/Components/DropdownMenu";
import { Button } from "@/Components/ui/button";
import { Layout } from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

const Couriers: FC<any> = (props: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "full_name",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Nama Lengkap</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("full_name")}
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
                            label: "Ubah",
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
            authenticated={props.auth.user}
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
