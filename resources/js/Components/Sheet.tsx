import {
    Sheet as ShadcnSheet,
    SheetContent,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "./ui/button";
import { IconMenu } from "@tabler/icons-react";
import { FC } from "react";

interface SheetProps {
    trigger: any;
    children: any;
}

export const Sheet: FC<SheetProps> = ({ trigger, children }: SheetProps) => {
    return (
        <ShadcnSheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>

            <SheetContent side="left" className="p-8 justify-center flex flex-col">
                {children}
            </SheetContent>
        </ShadcnSheet>
    );
};
