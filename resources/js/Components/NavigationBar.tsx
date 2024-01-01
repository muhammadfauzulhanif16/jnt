import { FC } from "react";
import { Sheet } from "./Sheet";
import { Button } from "./ui/button";
import { IconMenu } from "@tabler/icons-react";
import { router } from "@inertiajs/react";

interface NavigationBarProps {
    title: string;
    authenticated: any;
}

export const NavigationBar: FC<NavigationBarProps> = ({
    title,
    authenticated,
}: NavigationBarProps) => {
    let navigations = [
        {
            label: "Penjadwalan",
            href: "schedule.index",
        },
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

    if (authenticated.role === "courier") {
        navigations = navigations.filter(
            (item) => item.label === "Penjadwalan" || item.label === "Pesanan" || item.label === "Pelanggan"
        );
    }

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
