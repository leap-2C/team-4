"use client";
import React from "react";
import { Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const handleReturnToExplore = () => {
    router.push("/Dashboard/explore");
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="flex flex-col gap-[16px] items-center justify-center">
        <div className="w-[696px] h-[311px] p-6 flex flex-col items-center gap-6">
          <div className="w-[648px] h-[108px] flex flex-col items-center justify-between">
            <div className="w-[64px] h-[64px] bg-green-500 rounded-full flex justify-center items-center">
              <div className="w-[28px] h-[28px] bg-green-500 border-[2px] text-white border-white rounded-full flex justify-center items-center">
                <Check className="w-[16px] h-[16px]" />
              </div>
            </div>
            <p className="text-[16px] font-semibold">Donation completed!</p>
          </div>
          <div className="w-[510px] h-[131px] flex flex-col gap-2 px-3 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-[14px] font-medium">Jake:</p>
            </div>
            <p className="text-[14px] font-normal">
              Thank you for supporting me! It means a lot to have your support.
              It’s a step toward creating a more inclusive and accepting
              community of artists.
            </p>
          </div>
        </div>
        <Button onClick={handleReturnToExplore} className="w-[148px] h-[40px]">
          Return to explore
        </Button>
      </div>
    </div>
  );
}

export default Page;
