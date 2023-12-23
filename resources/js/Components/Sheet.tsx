import {
    Sheet as ShadcnSheet,
    SheetContent,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "./ui/button";
import { IconMenu } from "@tabler/icons-react";

export const Sheet = () => {
    return (
        <ShadcnSheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full" variant="ghost">
                    <IconMenu className="w-4 h-4" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-8">
                asd
            </SheetContent>
        </ShadcnSheet>
    );
};
