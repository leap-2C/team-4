import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

function UsersCard() {
  return (
    <div className="w-[861px] flex flex-col p-6 gap-3">
      <div className="w-[861px] flex justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-[20px] font-semibold">Space ranger</p>
        </div>
        <Button className="text-[14px] font-medium bg-gray-300 text-black h-[40px] w-[136px]">
          View profile <ExternalLink className="w-[16px] h-[16px]" />{" "}
        </Button>
      </div>
      <div className="w-[861px] h-[124px] flex justify-between">
        <div className="w-[420px] h-[124px] flex flex-col justify-between">
          <p className="text-[16px] font-semibold">About Space ranger</p>
          <div className="w-[420px] h-[80px] overflow-scroll text-[14px] font-normal">
            All day, every day, we're watching, listening to, reading and
            absorbing politics. It's exhausting. We then report on what we've
            seen in a way that's as chill as possible. None of the
            sensationalism and division you'll find elsewhere. It's about
            clarity, focus, approachability, and having a little wry smile
            almost all the time.
          </div>
        </div>
        <div className="w-[420px] h-[64px]">
          {" "}
          <div className="w-[420px] h-[124px] flex flex-col justify-between">
            <p className="text-[16px] font-semibold">About Space ranger</p>
            <div className="w-[420px] h-[80px] overflow-scroll text-[14px] font-normal">
              https://buymeacoffee.com/baconpancakes1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersCard;
