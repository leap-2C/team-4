"use client";
import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function personalInfo() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Personal Info</p>
      <div className="flex flex-col w-[160px] gap-2">
        <p className="text-[14px] font-medium">Add photo</p>
        <Avatar
          className="w-[160px] h-[160px] cursor-pointer hover:opacity-80 transition flex items-center justify-center relative"
          onClick={triggerFileInput}
        >
          <Camera className="absolute opacity-[0.2] w-10 h-10" />
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
      <div>
        <p className="text-[14px] font-medium">Name</p>
        <Input className="w-[602px] mt-2" placeholder="Enter your name" />
      </div>
      <div>
        <p className="text-[14px] font-medium">About</p>
        <Input
          className="w-[602px]  mt-2"
          placeholder="Add text about yourself"
        />
      </div>
      <div>
        <p className="text-[14px] font-medium">Social media URL</p>
        <Input
          className="w-[602px]  mt-2"
          placeholder="Add your social media URL"
        />
      </div>
      <Button className="w-[602px] mt-4" variant="default">
        Save changes
      </Button>
    </div>
  );
}
export default personalInfo;
