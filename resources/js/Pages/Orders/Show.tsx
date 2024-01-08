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
    IconPrinter,
    IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { FC, useState } from "react";

const ShowOrder: FC<any> = (props: any) => {
    function getQueryParam(param: any) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

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
            <div className="w-full">
                <Button
                    className="w-full mb-4 rounded-full"
                    onClick={(e) => {
                        e.preventDefault();
                        router.get(route("print.orders", {
                            order_id: getQueryParam('order_id')
                        }));
                    }}
                >
                    <IconPrinter className="w-4 h-4 mr-2" />
                    Cetak Pesanan
                </Button>

                <DataTable
                    data={props.items}
                    columns={columns}
                    search={{
                        placeholder: "Cari barang berdasarkan nomor resi...",
                        column: "receipt_number",
                    }}
                />
            </div>
        </Layout>
    );
};

export default ShowOrder;
