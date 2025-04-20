"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { updateUserProfile } from "@/app/_api/_components/updateUserProfile";

function CoverPictureStyle() {
  const [image, setImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    avatarImage: "",
    about: "",
    socialMediaURL: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    const name = localStorage.getItem("name") || "";
    const avatarImage = localStorage.getItem("avatarImage") || "";
    const about = localStorage.getItem("about") || "";
    const socialMediaURL = localStorage.getItem("socialMediaURL") || "";
    const coverImage = localStorage.getItem("coverImage");

    setUserData({ userId, name, avatarImage, about, socialMediaURL });

    if (coverImage) {
      setImage(coverImage);
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setImage(base64Image);
      localStorage.setItem("coverImage", base64Image);

      try {
        const { userId, name, about, avatarImage, socialMediaURL } = userData;

        // if (!userId || !name) {
        //   throw new Error("User ID or Name not found.");
        // }

        const payload = {
          id: userId,
          name: name,
          about,
          avatarImage,
          socialMediaURL,
          backgroundImage: base64Image,
        };

        console.log("Sending to backend:", payload);

        await updateUserProfile(payload);
        console.log("✅ Background updated successfully");
      } catch (err: any) {
        alert(err.message);
      }
    };

    reader.readAsDataURL(file);
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
