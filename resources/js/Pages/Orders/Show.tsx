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

const ShowOrder: FC<any> = (props: any) => {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "receipt_number",
            header: ({ table }) => (
                <div className="capitalize whitespace-nowrap">Nomor Resi</div>
            ),
            cell: ({ row }) => (
                <div className="capitalize whitespace-nowrap">
                    {row.getValue("receipt_number")}
                </div>
            ),
        },
    ];

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            mainPageHref="orders.index"
        >
            <DataTable
                data={props.items}
                columns={columns}
                search={{
                    placeholder: "Cari barang berdasarkan nomor resi...",
                    column: "receipt_number",
                }}
            />
        </Layout>
    );
};

export default ShowOrder;
