import { Sheet } from "./Sheet";
import Logo from "../../images/J&T_Express_logo.svg";
import { Button } from "./ui/button";
import { DropdownMenu } from "./DropdownMenu";
import { IconLogin, IconLogout, IconUser } from "@tabler/icons-react";
import { Link, router } from "@inertiajs/react";
import { NavigationBar } from "./NavigationBar";
import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface HeaderProps {
    title: string;
    authenticated: any;
}

export const Header: FC<HeaderProps> = ({
    title,
    authenticated,
}: HeaderProps) => {
    return (
        <header className="border-b container py-4 grid grid-cols-3 items-center">
            <NavigationBar title={title} />

            <img src={Logo} alt="Logo" className="w-20 justify-self-center" />

            <DropdownMenu
                label="Akun"
                trigger={
                    <Avatar className="justify-self-end cursor-pointer">
                        <AvatarFallback>
                            {authenticated.full_name
                                .split(" ")
                                .map((word: any) => word[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                }
                items={[
                    // {
                    //     label: "Profil",
                    //     icon: <IconUser className="w-4 h-4" />,
                    //     href: route("profile"),
                    // },
                    {
                        label: "Keluar",
                        icon: <IconLogout className="w-4 h-4" />,
                        onClick: (e: any) => {
                            e.stopPropagation();
                            e.preventDefault();
                            router.post(route("logout"));
                        },
                    },
                ]}
            />
        </header>
    );
};
