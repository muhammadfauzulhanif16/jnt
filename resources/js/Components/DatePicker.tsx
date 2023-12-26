import { FC, useState } from "react";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface DatePickerProps {
    value: any;
    onSelect: any;
}

export const DatePicker: FC<DatePickerProps> = ({
    value,
    onSelect,
}: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full rounded-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value ? format(value, "PPP") : <span>Pilih waktu</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="rounded-[20px] flex w-auto flex-col space-y-2 p-2"
            >
                <Select
                    onValueChange={(value) =>
                        onSelect(addDays(new Date(), parseInt(value)))
                    }
                >
                    <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent position="popper" className="rounded-[20px]">
                        <SelectItem value="0" className="rounded-full">
                            Today
                        </SelectItem>
                        <SelectItem value="1" className="rounded-full">
                            Tomorrow
                        </SelectItem>
                        <SelectItem value="3" className="rounded-full">
                            In 3 days
                        </SelectItem>
                        <SelectItem value="7" className="rounded-full">
                            In a week
                        </SelectItem>
                    </SelectContent>
                </Select>

                <div className="rounded-[20px] border">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onSelect}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};
