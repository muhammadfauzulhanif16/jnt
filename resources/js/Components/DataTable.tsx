import * as React from "react";
// import {
//     CaretSortIcon,
//     ChevronDownIcon,
//     DotsHorizontalIcon,
// } from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

// export const columns: ColumnDef<any>[] = [
//     // {
//     //     id: "select",
//     //     header: ({ table }) => (
//     //         <Checkbox
//     //             checked={
//     //                 table.getIsAllPageRowsSelected() ||
//     //                 (table.getIsSomePageRowsSelected() && "indeterminate")
//     //             }
//     //             onCheckedChange={(value) =>
//     //                 table.toggleAllPageRowsSelected(!!value)
//     //             }
//     //             aria-label="Select all"
//     //         />
//     //     ),
//     //     cell: ({ row }) => (
//     //         <Checkbox
//     //             checked={row.getIsSelected()}
//     //             onCheckedChange={(value) => row.toggleSelected(!!value)}
//     //             aria-label="Select row"
//     //         />
//     //     ),
//     //     enableSorting: false,
//     //     enableHiding: false,
//     // },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => (
//             <div className="capitalize">{row.getValue("status")}</div>
//         ),
//     },
//     {
//         accessorKey: "email",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() =>
//                         column.toggleSorting(column.getIsSorted() === "asc")
//                     }
//                 >
//                     Email
//                     {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
//                 </Button>
//             );
//         },
//         cell: ({ row }) => (
//             <div className="lowercase">{row.getValue("email")}</div>
//         ),
//     },
//     {
//         accessorKey: "amount",
//         header: () => <div className="text-right">Amount</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue("amount"));

//             // Format the amount as a dollar amount
//             const formatted = new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: "USD",
//             }).format(amount);

//             return <div className="text-right font-medium">{formatted}</div>;
//         },
//     },
// ];

interface DataTableProps {
    data: any[];
    columns: ColumnDef<any>[];
    search: {
        placeholder: string;
        column: string;
    };
}

export const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    search,
}: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full grow flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Input
                    placeholder={search.placeholder}
                    value={
                        (table
                            .getColumn(search.column)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(search.column)
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full rounded-full"
                />
            </div>

            <ScrollArea className="rounded-[20px] border h-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center border-none"
                                >
                                    Tidak ada hasil.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="flex items-center justify-end space-x-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} baris.
                </div>
                <div className="space-x-2">
                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>
        </div>
    );
};
