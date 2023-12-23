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

            <Link
                as="div"
                method="post"
                href={route("logout")}
                className="justify-self-end "
            >
                <Button variant="outline" className="rounded-full flex gap-2">
                    <IconLogout className="w-4 h-4" />

                    <span className="hidden sm:inline">Keluar</span>
                </Button>
            </Link>
        </header>
    );
};
