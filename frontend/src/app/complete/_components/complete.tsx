"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Camera, Coffee, Check, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createUserProfile } from "@/app/_api/_components/createUserProfile";

const Complete = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");

  const years = Array.from({ length: 70 }, (_, i) => 1950 + i);

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
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }
      const userProfile = {
        id: userId,
        name,
        about,
        AvatarImage: image || "",
        socialMediaURL,
        backgroundImage: "",
        successMessage: "Profile created successfully!",
      };
      await createUserProfile(userProfile);
      router.push("/dashboard/home");
    } catch (error: any) {
      alert(error.message || "Failed to create profile");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center flex-col">
      <div className="h-[56px] w-full flex flex-row items-center justify-between px-[80px] bg-white">
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
            Log out
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-full">
        {step === 1 && (
          <div className="w-[510px] gap-[24px] flex flex-col">
            <p className="text-[24px] font-[600]">Complete your profile page</p>
            <div className="gap-[8px] flex flex-col">
              <p>Add photo</p>
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

            <div className="flex flex-col gap-[12px]">
              <div>
                <p>Name</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-[40px]"
                  type="text"
                  placeholder="Enter your name here"
                />
              </div>
              <div>
                <p>About</p>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write about yourself here"
                  className="h-[131px] w-full border-[2px] rounded-lg p-[12px]"
                />
              </div>
              <div>
                <p>Social media URL</p>
                <Input
                  value={socialMediaURL}
                  onChange={(e) => setSocialMediaURL(e.target.value)}
                  className="h-[40px]"
                  type="text"
                  placeholder="http://"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmitProfile}
                className="h-[40px] w-[246px]"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complete;
