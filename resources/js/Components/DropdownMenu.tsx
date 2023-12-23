import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { FC } from "react";

interface DropdownMenuProps {
    trigger: any;
    label: string;
    items: any;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
    trigger,
    label,
    items,
}: DropdownMenuProps) => {
    return (
        <ShadcnDropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

            <DropdownMenuContent className="rounded-[20px]">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                {items.map((item: any, id: number) => (
                    <DropdownMenuItem key={id} className="rounded-full">{item}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
};
