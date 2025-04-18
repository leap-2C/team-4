
"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllProfile } from "@/app/_api/_components/getAllProfile";

interface Profile {
  id: string;
  name: string;
  avatarImage: string;
  bio: string;
  link: string;
}

function UsersCard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllProfile();
        setProfiles(data);
      } catch (err: any) {
        console.error("Error in UsersCard:", err);
        if (err.message.includes("404")) {
          setError("Хэрэглэгчийн мэдээлэл олдсонгүй.");
        } else {
          setError("Сервертэй холбогдоход алдаа гарлаа.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleViewPage = (id: string) => {
    router.push(`/view-page-other-user/${id}`);
  };

  if (loading) {
    return (
      <div className="w-[861px] flex justify-center p-6">
        <p className="text-[16px] font-medium">Түр хүлээнэ үү...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[861px] flex justify-center p-6">
        <p className="text-[16px] text-red-500">{error}</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="w-[861px] flex justify-center p-6">
        <p className="text-[16px] font-medium">Хэрэглэгч олдсонгүй.</p>
      </div>
    );
  }

  return (
    <div className="w-[861px] flex flex-col gap-6 p-6">
      {profiles.map((profile) => (
        <div key={profile.id} className="w-[861px] flex flex-col gap-3">
          <div className="w-[861px] flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={profile.avatarImage} alt={profile.name} />
                <AvatarFallback>{profile.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-[20px] font-semibold">{profile.name}</p>
            </div>
            <Button
              onClick={() => handleViewPage(profile.id)}
              className="text-[14px] font-medium h-[40px] w-[136px] flex gap-2"
            >
              Харах <ExternalLink className="w-[16px] h-[16px]" />
            </Button>
          </div>
          <div className="w-[861px] h-[124px] flex justify-between">
            <div className="w-[420px] h-[124px] flex flex-col justify-between">
              <p className="text-[16px] font-semibold">{profile.name}-н тухай</p>
              <div className="w-[420px] h-[80px] overflow-scroll text-[14px] font-normal">
                {profile.bio || "Тодорхойлолт байхгүй байна."}
              </div>
            </div>
            <div className="w-[420px] h-[124px] flex flex-col justify-between">
              <p className="text-[16px] font-semibold">Холбоос</p>
              <div className="w-[420px] h-[80px] overflow-scroll text-[14px] font-normal">
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersCard;
