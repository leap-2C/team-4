"use client";
import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CoverPictureStyle() {
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
    <div className="w-full h-[320px] flex justify-center items-center">
      <div className="w-[100%] h-[320px] flex flex-col justify-center items-center">
        {/* <Avatar
          className="w-full h-full cursor-pointer hover:opacity-80 transition flex items-center justify-center relative rounded-0" 
          onClick={triggerFileInput}
        >
          <AvatarImage
            className="object-cover w-full h-full rounded-none" 
          />
          <AvatarFallback>
            <Button
              className="mt-4 w-[181px] h-[40px] bg-gray-500 text-white hover:bg-blue-600 transition"
              onClick={triggerFileInput}
            >
              <Camera />
              Add a cover photo
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </Button>
          </AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
}

export default CoverPictureStyle;
