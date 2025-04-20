"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/Header/header";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Heart } from "lucide-react";
import { getUserProfile, Profile } from "@/app/_api/_components/GetUserProfile";

// Simple URL validation to prevent XSS
const sanitizeUrl = (url: string | null): string => {
  if (!url) return "";
  try {
    const parsedUrl = new URL(url);
    // Allow only http or https protocols
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return url;
    }
  } catch {
    // Invalid URL
  }
  return "";
};

function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(id);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    } else {
      setError("Хэрэглэгчийн ID олдсонгүй.");
      setLoading(false);
    }
  }, [id]);

  const handleDonationComplete = () => {
    // TODO: Implement donation logic (e.g., send data to payment API)
    router.push("/Donation-completed");
  };

  if (loading) {
    return (
      <div className="relative w-screen h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-[16px] font-medium">Түр хүлээнэ үү...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-screen h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-[16px] text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="relative w-screen h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-[16px] font-medium">Хэрэглэгчийн мэдээлэл олдсонгүй.</p>
        </div>
      </div>
    );
  }

  const sanitizedLink = sanitizeUrl(profile.link);

  return (
    <div className="relative w-screen min-h-screen">
      <Header />
      <img
        src="/banner.jpg"
        alt=""
        className="w-full h-[320px] object-cover"
      />
      <div className="absolute top-[20%] w-full z-30 flex flex-col lg:flex-row gap-[24px] justify-center px-4">
        <div className="flex flex-col w-full max-w-[682px] justify-center items-center gap-[24px] bg-white rounded-lg">
          <div className="border-[1px] rounded-lg gap-[8px] flex flex-col justify-center items-center w-full p-[24px]">
            <div className="flex justify-between items-center w-full max-w-[584px] h-[48px]">
              <div className="flex h-[24px] gap-[12px] justify-between items-center">
                <Avatar className="h-[48px] w-[48px]">
                  <AvatarImage
                    src={profile.avatarImage || "/fallback-image.png"}
                    alt={profile.name}
                    onError={(e) => (e.currentTarget.src = "/fallback-photo.png")}
                  />
                  <AvatarFallback>{profile.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="font-[700] text-[20px] leading-[24px]">
                  {profile.name}
                </p>
              </div>
            </div>
            <div className="py-[16px]">
              <div className="h-[1px] w-full max-w-[584px] bg-black"></div>
            </div>
            <div className="flex flex-col gap-[12px] justify-between items-start w-full max-w-[584px]">
              <p className="text-[16px] font-[600] leading-[32px]">
                {profile.name}-н тухай
              </p>
              <p>{profile.bio || "Тодорхойлолт байхгүй байна."}</p>
            </div>
          </div>
          <div className="border-[1px] rounded-lg w-full flex flex-col justify-center items-center p-[24px]">
            <div className="flex flex-col gap-[12px] justify-between items-start w-full max-w-[584px]">
              <p className="text-[16px] font-[600] leading-[24px]">Холбоос</p>
              <a
                href={sanitizedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {sanitizedLink || "Холбоос байхгүй байна."}
              </a>
            </div>
          </div>
          <div className="border-[1px] rounded-lg w-full flex flex-col justify-center items-center p-[24px]">
            <p className="w-full max-w-[584px] h-[36px] text-[16px] font-[600]">
              Сүүлийн дэмжигчид
            </p>
            <div className="w-full max-w-[584px] border-[1px] rounded-lg">
              <div className="py-[24px] px-[100px] flex flex-col justify-center items-center gap-[28px]">
                <Heart className="h-[30px] w-[30px]" />
                <p>{profile.name}-г дэмжсэн хүн байхгүй байна.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[1px] rounded-lg w-full max-w-[682px] bg-white">
          <div className="flex flex-col gap-[32px] p-[24px]">
            <div className="flex flex-col gap-[24px]">
              <p className="text-[24px] font-[600] leading-[32px]">
                {profile.name}-д кофе авч өг
              </p>
              <div className="flex flex-col gap-[8px]">
                <p>Хэмжээ сонго:</p>
                <div className="flex gap-[8px] flex-wrap">
                  <Button
                    className="flex gap-[5px] h-[40px] w-[72px]"
                    aria-label="Donate $1"
                  >
                    <Coffee />
                    $1
                  </Button>
                  <Button
                    className="flex gap-[5px] h-[40px] w-[72px]"
                    aria-label="Donate $2"
                  >
                    <Coffee />
                    $2
                  </Button>
                  <Button
                    className="flex gap-[5px] h-[40px] w-[72px]"
                    aria-label="Donate $5"
                  >
                    <Coffee />
                    $5
                  </Button>
                  <Button
                    className="flex gap-[5px] h-[40px] w-[72px]"
                    aria-label="Donate $10"
                  >
                    <Coffee />
                    $10
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <p>BuyMeCoffee эсвэл нийгмийн хаягийн URL оруул:</p>
                <Input
                  className="h-[40px]"
                  placeholder={sanitizedLink || "buymeacoffee.com/"}
                  defaultValue={sanitizedLink}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <p>Онцгой зурвас:</p>
                <Input
                  className="h-[131px]"
                  placeholder="Энд таны зурвасыг бичнэ үү"
                />
              </div>
            </div>
            <div>
              <Button
                onClick={handleDonationComplete}
                className="w-full"
                aria-label={`Дэмжих ${profile.name}`}
              >
                Дэмжих
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;