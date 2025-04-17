"use client";
import React from "react";
import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { X } from 'lucide-react';
function LeftEditSide() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }
    const handleClose = () => {
        setOpen(false);
    }
        const [image, setImage] = useState<string | null>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

       const name = localStorage.getItem("name")
      
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };
      
        const triggerFileInput = () => {
          fileInputRef.current?.click();
        };
  return (
    <div className="flex flex-col w-[682px] justify-center items-center gap-[24px] ">
        <div className="border-[1px] rounded-lg gap-[8px] flex flex-col justify-center items-center w-[100%] p-[24px]">
            <div className="flex justify-between items-center w-[584px] h-[48px]">
                <div className="flex h-[24px] gap-[12px] justify-between items-center">
                    <div>
                        <Avatar className="h-[48px] w-[48px]">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <p className="font-[700] text-[20px] line-weight-[24px] ">{name}</p>
                </div>
                <Button onClick={handleOpen}>Edit page</Button>
            </div>
            <div className="py-[16px]">
                <div className="h-[1px] w-[584px] bg-[black]"></div>
            </div>
            <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
                <p className="text-[16px] font-[600] line-heigth-[32px]">About Jake</p>
                <p>I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.</p>
            </div>
        </div>
        <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
            <div className="flex flex-col gap-[12px] justify-between items-start w-[584px] ">
                <p className="text-[16px] font-[600] line-height-[24px]">Social media URL</p>
                <p>https://buymeacoffee.com/spacerulz44</p>
            </div>
        </div>
        <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
                <p className="w-[584px] h-[36px]">Recent Supporters</p>
                <div className="w-[584px] border-[1px] rounded-lg">
                    <div className="py-[24px] px-[100px] flex flex-col justify-center items-center gap-[28px]">
                        <Heart className="h-[30px] w-[30px]"/>
                        <p>Be the first one to support Jake</p>
                    </div>
                </div>
        </div>
        {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="w-[610px] gap-[24px] flex flex-col bg-white p-[32px] rounded-lg shadow-lg">
      <div className="flex flex-col gap-[10px]">
        <div className="w-[100%] h-[20px] flex justify-end"><X onClick={handleClose} className="w-[20px] h-[20px]"/></div>
        <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] font-semibold leading-[32px]">Edit profile</p>
            <p>Make changes to your profile here. Click save when you're done.</p>
        </div>
        <div className="gap-[8px] flex flex-col">
          <p>Add photo</p>
          <Avatar
            className="w-[160px] h-[160px] cursor-pointer hover:opacity-80 transition flex items-center justify-center relative"
            onClick={triggerFileInput}
          >
            <Camera className="absolute opacity-20 w-10 h-10" />
            <AvatarImage
              src={
                image ||
                "https://w7.pngwing.com/pngs/754/473/png-transparent-avatar-boy-man-avatar-vol-1-icon.png"
              }
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <p>Name</p>
          <Input className="h-[40px]" type="text" placeholder="Enter your name here" />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p>About</p>
          <Input className="h-[131px]" type="text" placeholder="Write about yourself here" />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p>Social media URL</p>
          <Input className="h-[40px]" type="text" placeholder="http://" />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex gap-[12px]">
            <Button onClick={handleClose} className="h-[40px] bg-gray-200 text-black">
            Cancel
            </Button>
            <Button className="h-[40px] bg-black text-white">
            Save changes
            </Button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
export default LeftEditSide;