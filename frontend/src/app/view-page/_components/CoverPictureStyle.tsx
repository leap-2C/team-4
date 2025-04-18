"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function CoverPictureStyle() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("coverImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
        localStorage.setItem("coverImage", base64Image); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-screen h-[320px] relative z-0">
      {image ? (
        <Image src={image} alt="Cover Image" fill className="object-cover z-0" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
          No Cover Image
        </div>
      )}
      <div className="absolute top-4 right-4 z-10">
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
        className="hidden"
      />
    </div>
  );
}

export default CoverPictureStyle;
