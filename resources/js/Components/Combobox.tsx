import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { FC, useState } from "react";

interface ComboboxProps {
    options: any[];
    placeholder: string;
    commandItemProps?: any;
}

export const Combobox: FC<ComboboxProps> = ({
    options,
    placeholder,
    commandItemProps,
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="rounded-full">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full rounded-full justify-between"
                >
                    {commandItemProps.value
                        ? options.find(
                              (option) =>
                                  option.value === commandItemProps.value
                          )?.label
                        : `Pilih ${placeholder}...`}
                    <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full rounded-[20px] p-0">
                <Command className="rounded-[20px]">
                    <CommandInput
                        placeholder={`Cari ${placeholder}...`}
                        className="h-9 border-0 focus:ring-0"
                    />

                    <CommandEmpty>
                        Tidak ditemukan.
                    </CommandEmpty>

                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                {...commandItemProps}
                                className="rounded-full cursor-pointer"
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    commandItemProps.onChange(
                                        currentValue === commandItemProps.value
                                            ? ""
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}
                            >
                                {option.label}
                                <IconCheck
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        commandItemProps.value === option.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
