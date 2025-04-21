import React from "react";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import UsersCard from "./UsersCard";

function ExploreCreatorsCard() {
  return (
    <div className="w-957px p-6 flex flex-col gap-6">
      <div className="w-[909px] h-[88px] flex flex-col justify-between">
        <p className="text-[20px] font-semibold">Explore creators</p>
        <div className="w-[243px] h-[36px] border-[1px] rounded-[8px] px-[12px] flex justify-center items-center">
          <Search className="w-[16px] h-[16px] " />
          <Input className="border-0" placeholder="Search name" />
        </div>
      </div>
      <div className="w-[909px] border-[1px] border-gray-300 rounded-[8px]">
        <UsersCard />
      </div>
    </div>
  );
}

export default ExploreCreatorsCard;
