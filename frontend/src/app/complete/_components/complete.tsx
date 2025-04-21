"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Camera, Coffee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createUserProfile } from "@/app/_api/_components/createUserProfile";

const Complete = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleSubmitProfile = async () => {
    try {
      setError(null);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
      }

      if (!name.trim()) {
        throw new Error("Нэр оруулах шаардлагатай.");
      }

      const userProfile = {
        id: userId,
        name: name.trim(),
        about: about.trim(),
        avatarImage: image || "",
        socialMediaURL: socialMediaURL.trim(),
        backgroundImage: "",
      };

      console.log("Submitting profile:", userProfile);
      await createUserProfile(userProfile);

  
      const profileUpdatedEvent = new CustomEvent("profileUpdated", {
        detail: { userId },
      });
      window.dispatchEvent(profileUpdatedEvent);

      setSuccess("Профайл амжилттай үүслээ!");
      setTimeout(() => {
        router.push("/dashboard/home");
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.message || "Профайл үүсгэхэд алдаа гарлаа.";
      setError(errorMessage);
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center flex-col">
      {/* Header */}
      <div className="h-[56px] w-full flex items-center justify-between px-[80px] bg-white border-b">
        <button
          onClick={() => router.push("/dashboard/home")}
          className="flex gap-2 items-center"
        >
          <Coffee className="w-[20px] h-[20px]" />
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </button>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              router.push("/login");
            }}
          >
            Гарах
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[510px] gap-[24px] flex flex-col">
          <p className="text-[24px] font-[600]">
            Профайлаа бүрэн гүйцэд бөглөнө үү
          </p>

          {error && <p className="text-red-500 text-[16px]">{error}</p>}
          {success && <p className="text-green-600 text-[16px]">{success}</p>}

          {/* Avatar Upload */}
          <div className="gap-[8px] flex flex-col">
            <p>Зураг нэмэх</p>
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

          {/* Form Inputs */}
          <div className="flex flex-col gap-[12px]">
            <div>
              <p>Нэр</p>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[40px]"
                type="text"
                placeholder="Нэрээ оруулна уу"
              />
            </div>
            <div>
              <p>Тухай</p>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Өөрийн тухай бичнэ үү"
                className="h-[131px] w-full border-[2px] rounded-lg p-[12px]"
              />
            </div>
            <div>
              <p>Сошиал медиагийн URL</p>
              <Input
                value={socialMediaURL}
                onChange={(e) => setSocialMediaURL(e.target.value)}
                className="h-[40px]"
                type="text"
                placeholder="http://"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitProfile}
              className="h-[40px] w-[246px]"
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
