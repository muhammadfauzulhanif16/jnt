import { Header } from "@/Components/Header";
import { cn } from "@/lib/utils";
import { Head, Link, router } from "@inertiajs/react";
import { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { IconCornerDownLeft, IconPlus } from "@tabler/icons-react";

interface LayoutProps {
    children: any;
    title?: string;
    description?: string;
    isAuthenticated: any;
    subPageHref?: string;
    mainPageHref?: string;
    disabled?: boolean;
}

export const Layout: FC<LayoutProps> = ({
    children,
    title,
    description,
    isAuthenticated,
    subPageHref = "",
    mainPageHref = "",
    disabled,
}: LayoutProps) => {
    return (
        <section
            className={cn(
                "h-screen flex flex-col",
                !isAuthenticated && "justify-center items-center px-8"
            )}
        >
            <Head>
                <title>{title}</title>
                <link rel="ico" href="favicon.ico" />
            </Head>

            {isAuthenticated && <Header />}

            {isAuthenticated ? (
                <Card className="h-full border-none p-8 flex flex-col gap-8 rounded-none">
                    <CardHeader className="p-0 flex-row justify-between items-start">
                        <div>
                            <CardTitle className="w-max mb-2">
                                {title}
                            </CardTitle>
                            <CardDescription className="w-max">
                                {description}
                            </CardDescription>
                        </div>

                        <Button
                            type={subPageHref ? "button" : "submit"}
                            disabled={disabled}
                            className="w-max rounded-full"
                            onClick={() =>
                                subPageHref && router.get(route(subPageHref))
                            }
                        >
                            {title?.includes("Daftar") ? (
                                <IconPlus className="w-4 h-4" />
                            ) : (
                                <IconCornerDownLeft className="w-4 h-4" />
                            )}

                            <span className="ml-2 hidden sm:inline">
                                {title?.includes("Ubah") ? "Ubah" : "Tambah"}
                            </span>
                        </Button>
                        {/* </Link> */}
                    </CardHeader>

                    <CardContent className="p-0 flex grow">
                        {children}
                    </CardContent>
                </Card>
            ) : (
                <>{children}</>
            )}
        </section>
    );
};
