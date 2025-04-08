"use client"

import React from "react";
import { useRouter } from "next/navigation";

function DashboardSideBar() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/dashboard/home");
  };
  const handleExploreClick = () => {
    router.push("/dashboard/explore");
  };
  const handleViewPageClick = () => {
    router.push("/dashboard/view-page");
  };
  const handleAccountSettingsClick = () => {
    router.push("/dashboard/account-settings");
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleHomeClick}
        className=" w-[250px] h-[36px] rounded-md py-2 px-4 flex justify-start text-[14px] font-medium hover:bg-gray-200"
      >
        Home
      </button>
      <button
        onClick={handleExploreClick}
        className="w-[250px] h-[36px] rounded-md py-2 px-4 text-[14px] font-medium flex justify-start hover:bg-gray-200"
      >
        Explore
      </button>
      <button
        onClick={handleViewPageClick}
        className="w-[250px] h-[36px] rounded-md py-2 px-4 text-[14px] font-medium flex justify-start hover:bg-gray-200"
      >
        View page
      </button>
      <button
        onClick={handleAccountSettingsClick}
        className="w-[250px] h-[36px] rounded-md py-2 px-4 text-[14px] font-medium flex justify-start hover:bg-gray-200"
      >
        Account settings
      </button>
    </div>
  );
}

export default DashboardSideBar;
