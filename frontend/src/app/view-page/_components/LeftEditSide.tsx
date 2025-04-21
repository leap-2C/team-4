"use client";

import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Camera, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getUserProfile } from "@/app/_api/_components/GetUserProfile";
import { updateUserProfile } from "@/app/_api/_components/updateUserProfile";

function LeftEditSide() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [socialMediaURL, setSocialMediaURL] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await getUserProfile(); 
        setName(profile.name);
        setAbout(profile.about || "");
        setSocialMediaURL(profile.socialMediaURL || "");
        setImage(profile.avatarImage || "");
      } catch (err: any) {
        setError(err.message || "Failed to fetch profile information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile saving
  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      if (!name.trim()) {
        throw new Error("Name is required.");
      }

      const profileData = {
        id: userId,
        name: name.trim(),
        about: about.trim(),
        avatarImage: image || "",
        socialMediaURL: socialMediaURL.trim(),
        backgroundImage: "",
      };

      await updateUserProfile(profileData); 

      const profileUpdatedEvent = new CustomEvent("profileUpdated", {
        detail: { userId },
      });
      window.dispatchEvent(profileUpdatedEvent);

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Error updating profile.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleOpen = () => {
    setOpen(true);
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="flex flex-col w-[682px] justify-center items-center gap-[24px]">
      <div className="border-[1px] rounded-lg gap-[8px] flex flex-col justify-center items-center w-[100%] p-[24px]">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <div className="flex justify-between items-center w-[584px] h-[48px]">
          <div className="flex h-[24px] gap-[12px] justify-between items-center">
            <div>
              <Avatar className="h-[48px] w-[48px]">
                <AvatarImage
                  src={image || "https://github.com/shadcn.png"}
                  alt="Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <p className="font-[700] text-[20px] line-height-[24px]">{name}</p>
          </div>
          <Button onClick={handleOpen}>Edit Profile</Button>
        </div>
        <div className="py-[16px]">
          <div className="h-[1px] w-[584px] bg-[black]"></div>
        </div>
        <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
          <p className="text-[16px] font-[600] line-height-[32px]">About</p>
          <p>{about}</p>
        </div>
      </div>

      <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
        <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
          <p className="text-[16px] font-[600] line-height-[24px]">
            Social Media URL
          </p>
          {socialMediaURL && (
            <a
              href={socialMediaURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-blue-500 underline mt-1 block"
            >
              {socialMediaURL}
            </a>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[610px] gap-[24px] flex flex-col bg-white p-[32px] rounded-lg shadow-lg">
            <div className="flex flex-col gap-[10px]">
              <div className="w-[100%] h-[20px] flex justify-end">
                <X onClick={handleClose} className="w-[20px] h-[20px]" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p className="text-[24px] font-semibold leading-[32px]">
                  Edit Profile
                </p>
                <p>
                  Please update your profile and click save changes when you're
                  done.
                </p>
              </div>
              <div className="gap-[8px] flex flex-col">
                <p>Profile Image</p>
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
                <Input
                  className="h-[40px]"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p>About</p>
                <textarea
                  className="h-[131px] w-full border-[2px] rounded-lg p-[12px]"
                  placeholder="Tell us about yourself"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p>Social Media URL</p>
                <Input
                  className="h-[40px]"
                  type="text"
                  placeholder="http://"
                  value={socialMediaURL}
                  onChange={(e) => setSocialMediaURL(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div className="flex justify-end">
              <div className="flex gap-[12px]">
                <Button
                  onClick={handleClose}
                  className="h-[40px] bg-gray-200 text-black"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  className="h-[40px] bg-black text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
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
