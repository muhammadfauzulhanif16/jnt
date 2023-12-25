import { Header } from "@/Components/Header";
import { cn } from "@/lib/utils";
import { Head, router } from "@inertiajs/react";
import { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { IconCornerDownLeft, IconPlus } from "@tabler/icons-react";

interface LayoutProps {
    children: any;
    title: string;
    description?: string;
    authenticated: any;
    subPageHref?: string;
    mainPageHref?: string;
    disabled?: boolean;
    onSubmit?: any;
}

export const Layout: FC<LayoutProps> = ({
    children,
    title,
    description,
    authenticated,
    subPageHref = "",
    mainPageHref = "",
    disabled,
    onSubmit,
}: LayoutProps) => {
    return (
        <section
            className={cn(
                "h-screen flex flex-col",
                !authenticated && "justify-center items-center px-8"
            )}
        >
            <Head>
                <title>{title}</title>
                <link rel="ico" href="favicon.ico" />
            </Head>

            {authenticated && (
                <Header title={title} authenticated={authenticated} />
            )}

            {authenticated ? (
                <form onSubmit={onSubmit} className="h-full">
                    <Card className="h-full border-none p-8 flex flex-col gap-8 rounded-none">
                        <CardHeader className="p-0 flex-row justify-between items-start">
                            <div>
                                <CardTitle className="w-max">
                                    {title.includes("Daftar") ? (
                                        title
                                    ) : (
                                        <>
                                            <span
                                                className="underline cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.get(
                                                        route(mainPageHref)
                                                    );
                                                }}
                                            >
                                                {title.split(" ")[1]}
                                            </span>
                                            {" / "}
                                            <span className="text-base">
                                                {title.split(" ")[0]}
                                            </span>
                                        </>
                                    )}
                                </CardTitle>

                                <CardDescription className="w-max">
                                    {description}
                                </CardDescription>
                            </div>

                            <Button
                                type={subPageHref ? "button" : "submit"}
                                disabled={disabled}
                                className="w-max rounded-full hidden sm:flex flex-none"
                                onClick={() =>
                                    subPageHref &&
                                    router.get(route(subPageHref))
                                }
                            >
                                {title?.includes("Daftar") ? (
                                    <IconPlus className="w-4 h-4" />
                                ) : (
                                    <IconCornerDownLeft className="w-4 h-4" />
                                )}

                                <span className="ml-2 hidden sm:inline">
                                    {title?.includes("Ubah")
                                        ? "Ubah"
                                        : "Tambah"}
                                </span>
                            </Button>

                            <Button
                                type={subPageHref ? "button" : "submit"}
                                disabled={disabled}
                                className="rounded-full sm:hidden flex-none"
                                size="icon"
                                onClick={() =>
                                    subPageHref &&
                                    router.get(route(subPageHref))
                                }
                            >
                                {title?.includes("Daftar") ? (
                                    <IconPlus className="w-4 h-4" />
                                ) : (
                                    <IconCornerDownLeft className="w-4 h-4" />
                                )}
                            </Button>
                        </CardHeader>

                        <CardContent className="p-0 flex grow h-0">
                            {children}
                        </CardContent>
                    </Card>
                </form>
            ) : (
                <>{children}</>
            )}
        </section>
    );
};
