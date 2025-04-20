"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UsersCard from "./UsersCard";

function ExploreCreatorsCard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-[957px] p-6 flex flex-col gap-6">
      <div className="w-[909px] h-[88px] flex flex-col justify-between">
        <p className="text-[20px] font-semibold">Explore creators</p>
        <div className="w-[243px] h-[36px] border-[1px] rounded-[8px] px-[12px] flex items-center gap-2">
          <Search className="w-[16px] h-[16px]" />
          <Input
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="w-[909px]">
        <UsersCard searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default ExploreCreatorsCard;
