import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link, router } from "@inertiajs/react";
import { FC } from "react";

interface DropdownMenuProps {
    trigger: any;
    label: string;
    items: any;
    linkProps?: any;
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
                    <DropdownMenuItem
                        disabled={item.disabled}
                        key={id}
                        className="rounded-full w-full cursor-pointer flex items-center gap-2"
                        onClick={item.onClick}
                    >
                        {item.icon} {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
};
