"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Coffee } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function Signup() {
    const router = useRouter();
  return (
    <div className="w-screen h-screen flex">
      <div className="w-[50%] h-full bg-amber-400 flex flex-col items-center justify-center">
        <div className="flex gap-2 items-center absolute top-[32px] left-[80px]">
          <div>
            <Coffee className="w-[20px] h-[20px]" />
          </div>
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="w-[455px] h-[370px] flex flex-col items-center gap-10">
          <div className="">
            <Image
              src="/coffe.png"
              alt="login"
              width={240}
              height={240}
              className="w-[240px] h-[240px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <p className="font-bold text-[24px]">Fund your creative work</p>
            <p className="font-normal text-[16px] text-center">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-full bg-white flex flex-col items-center justify-center ">
        <Button onClick={() => router.replace("/login")} className="w-[83px] h-[40px] rounded-md bg-secondary text-black absolute top-[32px] right-[80px]">
          Sign in
        </Button>
        <p className="text-[24px] font-semibold w-[407px] h-[80px] p-[22px] ">
          Create Your Account
        </p>
        <div className="w-[407px] h-[304px] p-[24px] pt-0">
          <div className="flex flex-col gap-2 mb-3">
            <p className="text-[14px] text-[#71717A] pb-4">Choose a username for your page</p>
            <p className="text-[14px] font-medium">Username</p>
            <Input
              className="w-[359px] h-[40px] rounded-md"
              placeholder="Enter username here"
            ></Input>
          </div>
         

          <Button className="w-[359px] h-[40px] rounded-md">Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
