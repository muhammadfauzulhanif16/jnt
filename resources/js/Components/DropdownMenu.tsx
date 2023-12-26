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
import { Dialog } from "./Dialog";

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
                    <div key={id}>
                        {item.isDialog ? (
                            <Dialog
                                title={item.title}
                                description={item.description}
                                trigger={
                                    <DropdownMenuItem
                                        disabled={item.disabled}
                                        className="rounded-full w-full cursor-pointer flex items-center gap-2"
                                        onClick={item.onClick}
                                    >
                                        {item.icon} {item.label}
                                    </DropdownMenuItem>
                                }
                                footer={item.footer}
                            />
                        ) : (
                            <DropdownMenuItem
                                disabled={item.disabled}
                                className="rounded-full w-full cursor-pointer flex items-center gap-2"
                                onClick={item.onClick}
                            >
                                {item.icon} {item.label}
                            </DropdownMenuItem>
                        )}
                    </div>
                ))}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
};
