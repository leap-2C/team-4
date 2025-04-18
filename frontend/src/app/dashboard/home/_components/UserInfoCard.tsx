"use client";

import React, { useEffect, useState } from "react";
import { Copy, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  { value: "Last 30 days", label: "Last 30 days" },
  { value: "Last 90 days", label: "Last 90 days" },
  { value: "All time", label: "All time" },
];

function UserInfoCard() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isCopied, setIsCopied] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setName(storedName);
      }
    }
  }, []);

  const handleCopyLink = async () => {
    if (!name) return; // Prevent copying if name is empty
    const link = `https://buymeacoffee.com/${name}`;
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Revert after 2 seconds
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Optionally show an error message
    }
  };

  return (
    <div className="w-[907px] border-[1px] rounded-[8px] border-gray-300 flex flex-col gap-3 p-6">
      <div className="w-[859px] h-[48px] flex justify-between">
        <div className="flex gap-3">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[16px] font-bold">{name || "User"}</p>
            <p className="text-[14px] font-normal">
              buymeacoffee.com/{name || "user"}
            </p>
          </div>
        </div>
        <button
          onClick={handleCopyLink}
          className={`bg-black text-white text-[14px] font-medium w-[159px] h-[40px] px-[16px] py-[8px] rounded-[8px] flex items-center gap-2 ${
            !name ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!name}
          aria-label={isCopied ? "Link copied" : "Copy share page link"}
        >
          <Copy className="w-[16px] h-[16px]" />
          {isCopied ? "Copied" : "Share page link"}
        </button>
      </div>

      <div className="w-[859px] h-[1px] bg-gray-300 my-3" />

      <div className="w-[859px] h-[104px] flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <p className="text-[20px] font-semibold">Earnings</p>
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
                          setValue(currentValue === value ? "" : currentValue);
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
        <div className="text-[36px] font-bold">450$</div>
      </div>
    </div>
  );
}

export default UserInfoCard;