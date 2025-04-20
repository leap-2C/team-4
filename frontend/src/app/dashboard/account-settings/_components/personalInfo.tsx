"use client";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/app/_api/_components/updateUserProfile";
import axios from "axios";
import { API_URL } from "@/app/_api/api";

function PersonalInfo() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [social, setSocial] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Профайлыг татах функц (дахин ашиглах боломжтой болгох)
  const fetchProfile = async (userId: string, token: string) => {
    try {
      const res = await axios.get(`${API_URL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profile = res.data;
      setName(profile.name || "");
      setAbout(profile.about || "");
      setSocial(profile.socialMediaURL || "");
      setImage(profile.avatarImage || null);
    } catch (error) {
      console.error("Fetch Profile Error:", error);
      setError("Профайлын мэдээллийг татахад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setId(userId);
      const token = localStorage.getItem("token");
      if (token) {
        fetchProfile(userId, token);
      } else {
        setError("Токен олдсонгүй. Дахин нэвтэрнэ үү.");
      }
    } else {
      setError("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
    }
  }, []);

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

  // PersonalInfo.tsx-ийн handleSubmit-ийн хэсэгт нэмнэ
  const handleSubmit = async () => {
    if (!id) {
      setError("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
      return;
    }

    setIsLoading(true);
    try {
      const profileData = {
        id,
        name: name.trim(),
        about: about.trim(),
        avatarImage: image || "",
        socialMediaURL: social.trim(),
        backgroundImage: "", // Add a default or appropriate value for backgroundImage
      };

      console.log("Submitting profile data:", profileData);
      const response = await updateUserProfile(profileData);

      // API-ийн хариунаас state шинэчлэх
      if (response && response.data) {
        setName(response.data.name || "");
        setAbout(response.data.about || "");
        setSocial(response.data.socialMediaURL || "");
        setImage(response.data.avatarImage || null);
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          await fetchProfile(id, token);
        }
      }

      // Custom event үүсгэж, профайл шинэчлэгдсэнийг мэдэгдэнэ
      const profileUpdatedEvent = new CustomEvent("profileUpdated", {
        detail: { userId: id },
      });
      window.dispatchEvent(profileUpdatedEvent);

      setSuccess("Өөрчлөлт амжилттай хадгалагдлаа!");
      setError(null);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "Өөрчлөлтийг хадгалахад алдаа гарлаа.");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Хувийн мэдээлэл</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <div className="flex flex-col w-[160px] gap-2">
        <p className="text-[14px] font-medium">Зураг нэмэх</p>
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
        <p className="text-[14px] font-medium">Нэр</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Нэрээ оруулна уу"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium">Тухай</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Өөрийн тухай текст оруулна уу"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium">Сошиал медиа URL</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Сошиал медиагийн URL оруулна уу"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
        />
      </div>

      <Button
        className="w-[602px] mt-4"
        variant="default"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
      </Button>
    </div>
  );
}

export default PersonalInfo;
