import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

function RecentTransactions() {
  return (
    <div className="w-[907px] flex flex-col gap-3">
      <div className=" w-[907px] h-[36px] flex justify-between">
        <p>Recent transactions</p>
        <div className="px-2 py-4 w-[109px] h-[36px] border-[1px] border-gray-300 border-dotted rounded-[8px] flex justify-between items-center">
          <Popover>
            <PopoverTrigger className="text-[14px] font-medium flex items-center gap-2">
              <ChevronDown className="w-[16px] h-[16px]" />
              Amount{" "}
            </PopoverTrigger>
            <PopoverContent className="w-[198px] h-[138px] px-[10px] py-[8px] flex flex-col gap-[12px]">
              <div className="flex items-center gap-2">
                <Checkbox className="w-[16px] h-[16px]" />
                <p className="text-[14px] font-normal">$1</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox className="w-[16px] h-[16px]" />
                <p className="text-[14px] font-normal">$2</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox className="w-[16px] h-[16px]" />
                <p className="text-[14px] font-normal">$5</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox className="w-[16px] h-[16px]" />
                <p className="text-[14px] font-normal">$10</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="p-6 border-[1px] border-gray-300 rounded-[8px] max-h-[500px] overflow-y-auto">
        <div className="p-3  flex flex-col gap-[16px] ">
          <div className="w-[835px] h-[40px] flex justify-between">
            <div className="flex gap-3">
              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[14px] font-medium">Jake</p>
                <p className="text-[12px] font-normal">
                  buymeacoffee.com/baconpancakes1
                </p>
              </div>
            </div>
            <div>
              <p className="text-[16px] font-bold">+ $1</p>
              <p className="text-[12px] font-normal text-gray-400">
                10 hours ago
              </p>
            </div>
          </div>
          <div>
            <p className="text-[14px] font-normal">
              Thank you for being so awesome everyday! You always manage to
              brighten up my day when I’m feeling down. Although $1 isn’t that
              much money it’s all I can contribute at the moment{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;
