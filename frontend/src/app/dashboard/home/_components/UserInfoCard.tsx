"use client"

import React from "react";
import { Copy } from "lucide-react";
import { useState } from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "Last 30 days",
    label: "Last 30 days",
  },
  {
    value: "Last 90 days",
    label: "Last 90 days",
  },
  {
    value: "All time",
    label: "All time",
  }
];

function UserInfoCard() {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className=" w-[907px] h-[257px] border-[1px] rounded-[8px] border-gray-300 flex flex-col gap-3 p-6 ">
      <div className="w-[859px] h-[48px] flex justify-between ">
        <div className="flex gap-3">
          <div className="w-[48px] h-[48px] bg-amber-400"></div>
          <div>
            <p className="text-[16px] font-bold">Jake</p>
            <p className="text-[14px] font-normal">
              buymeacoffee.com/baconpancakes1
            </p>
          </div>
        </div>
        <button className=" bg-black text-white text-[14px] font-medium w-[159px] h-[40px] px-[16px] py-[8px] rounded-[8px] flex items-center gap-2">
          <Copy className="w-[16px] h-[16px]" />
          Share page link
        </button>
      </div>
      <div className="w-[859px] h-[33px] flex justify-center items-center">
        <div className="w-[859px] h-[1px] bg-gray-300"></div>
      </div>
      <div className="w-[859px] h-[104px] flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <p className="text-[20px] font-semibold">Earnings</p>
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Last 30 days"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                    
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="text-[36px] font-bold">450$</div>
      </div>
    </div>
  );
}

export default UserInfoCard;
