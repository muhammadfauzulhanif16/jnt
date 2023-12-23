import { Sheet } from "./Sheet";
import Logo from "../../images/J&T_Express_logo.svg";
import { Button } from "./ui/button";
import { DropdownMenu } from "./DropdownMenu";
import { IconLogin, IconLogout, IconUser } from "@tabler/icons-react";
import { Link, router } from "@inertiajs/react";

export const Header = () => {
    return (
        <header className="border-b container py-4 grid grid-cols-3 items-center">
            <Sheet />

            <img src={Logo} alt="Logo" className="w-20 justify-self-center" />

            <Button
                variant="outline"
                className="rounded-full flex gap-2 hidden sm:flex justify-self-end"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.post(route("logout"));
                }}
            >
                <IconLogout className="w-4 h-4" />

                <span className="hidden sm:inline">Keluar</span>
            </Button>

            <Button
                variant="outline"
                className="rounded-full flex gap-2 sm:hidden justify-self-end"
                size="icon"
                onClick={(e) => {
                    e.preventDefault();
                    router.post(route("logout"));
                }}
            >
                <IconLogout className="w-4 h-4" />
            </Button>
        </header>
    );
};
