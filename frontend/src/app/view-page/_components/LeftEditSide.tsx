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
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
        }

        const profile = await getUserProfile(userId);
        setName(profile.name);
        setAbout(profile.about || "");
        setSocialMediaURL(profile.socialMediaURL || "");
        setImage(profile.avatarImage || "");
      } catch (err: any) {
        setError(err.message || "Профайлын мэдээлэл татахад алдаа гарлаа.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Профайлыг шинэчлэх
  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
      }

      if (!name.trim()) {
        throw new Error("Нэр оруулах шаардлагатай.");
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

      // profileUpdated event үүсгэх
      const profileUpdatedEvent = new CustomEvent("profileUpdated", {
        detail: { userId },
      });
      window.dispatchEvent(profileUpdatedEvent);

      setSuccess("Профайл амжилттай шинэчлэгдлээ!");
      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Профайл шинэчлэхэд алдаа гарлаа.");
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
      {/* Profile Card */}
      <div className="border-[1px] rounded-lg gap-[8px] flex flex-col justify-center items-center w-[100%] p-[24px]">
        {isLoading && <p>Ачааллаж байна...</p>}
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
          <Button onClick={handleOpen}>Хуудсыг засах</Button>
        </div>
        <div className="py-[16px]">
          <div className="h-[1px] w-[584px] bg-[black]"></div>
        </div>
        <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
          <p className="text-[16px] font-[600] line-height-[32px]">Тухай</p>
          <p>{about}</p>
        </div>
      </div>

      {/* Social Media URL Section */}
      <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
        <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
          <p className="text-[16px] font-[600] line-height-[24px]">
            Сошиал медиагийн URL
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

      {/* Recent Supporters Section */}
      <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
        <p className="w-[584px] h-[36px]">Сүүлийн дэмжигчид</p>
        <div className="w-[584px] border-[1px] rounded-lg">
          <div className="py-[24px] px-[100px] flex flex-col justify-center items-center gap-[28px]">
            <Heart className="h-[30px] w-[30px]" />
            <p>Анхны дэмжигч болоорой</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[610px] gap-[24px] flex flex-col bg-white p-[32px] rounded-lg shadow-lg">
            <div className="flex flex-col gap-[10px]">
              <div className="w-[100%] h-[20px] flex justify-end">
                <X onClick={handleClose} className="w-[20px] h-[20px]" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p className="text-[24px] font-semibold leading-[32px]">
                  Профайлыг засах
                </p>
                <p>
                  Профайлдаа өөрчлөлт оруулаад, дууссаны дараа хадгалах товчийг
                  дарна уу.
                </p>
              </div>
              <div className="gap-[8px] flex flex-col">
                <p>Зураг нэмэх</p>
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
                <p>Нэр</p>
                <Input
                  className="h-[40px]"
                  type="text"
                  placeholder="Нэрээ оруулна уу"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p>Тухай</p>
                <textarea
                  className="h-[131px] w-full border-[2px] rounded-lg p-[12px]"
                  placeholder="Өөрийн тухай бичнэ үү"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p>Сошиал медиагийн URL</p>
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
                  Цуцлах
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  className="h-[40px] bg-black text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
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
