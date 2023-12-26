import {
    Dialog as ShadcnDialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { router } from "@inertiajs/react";
import { FC } from "react";

interface DialogProps {
    trigger: any;
    title: string;
    description: string;
    footer: any;
}

export const Dialog: FC<DialogProps> = ({
    trigger,
    title,
    description,
    footer,
}: DialogProps) => {
    return (
        <ShadcnDialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter>{footer}</DialogFooter>
            </DialogContent>
        </ShadcnDialog>
    );
};
