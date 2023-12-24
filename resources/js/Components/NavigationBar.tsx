import { FC } from "react";
import { Sheet } from "./Sheet";
import { Button } from "./ui/button";
import { IconMenu } from "@tabler/icons-react";
import { router } from "@inertiajs/react";

interface NavigationBarProps {
    title: string;
}

export const NavigationBar: FC<NavigationBarProps> = ({
    title,
}: NavigationBarProps) => {
    const navigations = [
        {
            label: "Pesanan",
            href: "orders.index",
        },
        {
            label: "Pelanggan",
            href: "customers.index",
        },
        {
            label: "Kurir",
            href: "couriers.index",
        },
    ];

    return (
        <Sheet
            trigger={
                <Button size="icon" className="rounded-full" variant="ghost">
                    <IconMenu className="w-4 h-4" />
                </Button>
            }
        >
            {navigations.map((navigation, id) => (
                <Button
                    key={id}
                    variant={
                        title.includes(navigation.label) ? "default" : "ghost"
                    }
                    className="rounded-full"
                    onClick={() => {
                        router.get(route(navigation.href));
                    }}
                >
                    {navigation.label}
                </Button>
            ))}
        </Sheet>
    );
};
