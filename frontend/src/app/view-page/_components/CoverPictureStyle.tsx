"use client";
import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
    <div className="w-full h-[320px] relative z-0 ">
      {image ? (
        <Image src={image} alt="" fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
          No Cover Image
        </div>
      )}
      <div className="absolute top-4 right-4 z-1 " >
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-white bg-opacity-30 hover:bg-opacity-90"
          onClick={triggerFileInput}
        >
          <Camera className="w-4 h-4" />
          Change Cover
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden relative z-0"
      />
    </div>
  );
}

export default CoverPictureStyle;
