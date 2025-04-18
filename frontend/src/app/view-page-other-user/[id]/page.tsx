
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/Header/header";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Heart } from "lucide-react";
import { getUserProfile } from "@/app/_api/_components/GetUserProfile";

interface Profile {
  id: string;
  name: string;
  avatarImage: string;
  bio: string;
  link: string;
}

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
    router.push("/donation-completed");
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

  return (
    <div className="relative w-screen h-screen">
      <Header />
      <img
        src="https://cdn.mos.cms.futurecdn.net/HuGGeENt6kGyixe3hT9tnY.jpg"
        alt="Баннерын зураг"
        className="w-screen h-[320px] object-cover"
      />
      <div className="absolute top-[20%] w-[100%] z-30 flex gap-[24px] justify-center">
        {/* Left Section: Profile Info */}
        <div className="flex flex-col w-[682px] justify-center items-center gap-[24px] bg-[white] rounded-lg">
          {/* Profile Info */}
          <div className="border-[1px] rounded-lg gap-[8px] flex flex-col justify-center items-center w-[100%] p-[24px]">
            <div className="flex justify-between items-center w-[584px] h-[48px]">
              <div className="flex h-[24px] gap-[12px] justify-between items-center">
                <Avatar className="h-[48px] w-[48px]">
                  <AvatarImage src={profile.avatarImage} alt={profile.name} />
                  <AvatarFallback>{profile.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="font-[700] text-[20px] line-height-[24px]">
                  {profile.name}
                </p>
              </div>
            </div>
            <div className="py-[16px]">
              <div className="h-[1px] w-[584px] bg-[black]"></div>
            </div>
            <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
              <p className="text-[16px] font-[600] line-height-[32px]">
                {profile.name}-н тухай
              </p>
              <p>{profile.bio || "Тодорхойлолт байхгүй байна."}</p>
            </div>
          </div>
          {/* Social Media URL */}
          <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
            <div className="flex flex-col gap-[12px] justify-between items-start w-[584px]">
              <p className="text-[16px] font-[600] line-height-[24px]">Холбоос</p>
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {profile.link || "Холбоос байхгүй байна."}
              </a>
            </div>
          </div>
          {/* Recent Supporters */}
          <div className="border-[1px] rounded-lg w-[100%] flex flex-col justify-center items-center p-[24px]">
            <p className="w-[584px] h-[36px] text-[16px] font-[600]">
              Сүүлийн дэмжигчид
            </p>
            <div className="w-[584px] border-[1px] rounded-lg">
              <div className="py-[24px] px-[100px] flex flex-col justify-center items-center gap-[28px]">
                <Heart className="h-[30px] w-[30px]" />
                <p>{profile.name}-г дэмжсэн хүн байхгүй байна.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section: Donation Form */}
        <div className="border-[1px] rounded-lg w-[682px] bg-[white]">
          <div className="flex flex-col gap-[32px] p-[24px]">
            <div className="flex flex-col gap-[24px]">
              <p className="text-[24px] font-[600] line-height-[32px]">
                {profile.name}-д кофе авч өг
              </p>
              <div className="flex flex-col gap-[8px]">
                <p>Хэмжээ сонго:</p>
                <div className="flex gap-[8px]">
                  <Button className="flex gap-[5px] h-[40px] w-[72px]">
                    <Coffee />
                    $1
                  </Button>
                  <Button className="flex gap-[5px] h-[40px] w-[72px]">
                    <Coffee />
                    $2
                  </Button>
                  <Button className="flex gap-[5px] h-[40px] w-[72px]">
                    <Coffee />
                    $5
                  </Button>
                  <Button className="flex gap-[5px] h-[40px] w-[72px]">
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
                  placeholder={profile.link || "buymeacoffee.com/"}
                  defaultValue={profile.link}
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
                className="w-[100%]"
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
