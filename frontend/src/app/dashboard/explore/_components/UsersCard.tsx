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
  bio?: string;
  link?: string;
  about?: string;
  socialMediaURL?: string;
}


interface UsersCardProps {
  searchTerm: string;
}

function UsersCard({ searchTerm }: UsersCardProps) {
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

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

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

  if (filteredProfiles.length === 0) {
    return (
      <div className="w-[861px] flex justify-center p-6">
        <p className="text-[16px] font-medium">Хэрэглэгч олдсонгүй.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {filteredProfiles.map((profile) => (
        <div
          key={profile.id}
          className="w-full flex flex-col gap-3 border border-gray-300 rounded-[8px] p-[24px]"
        >
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={profile.avatarImage} alt={profile.name} />
                <AvatarFallback>{profile.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-[20px] font-semibold">{profile.name}</p>
            </div>
            <Button
              onClick={() => router.push(`/view-page-other-user/${profile.id}`)}
              className="text-[14px] font-medium h-[40px] w-[136px] flex gap-2"
            >
              View profile <ExternalLink className="w-[16px] h-[16px]" />
            </Button>
          </div>

          <div className="w-full flex flex-wrap justify-between gap-4 mt-4">
            <div className="w-full md:w-[420px] flex flex-col gap-2">
              <p className="text-[16px] font-semibold">About {profile.name}</p>
              <div className="h-[80px] overflow-auto text-[14px] font-normal">
                {profile.about || profile.bio || "Тодорхойлолт байхгүй байна."}
              </div>
            </div>
            <div className="w-full md:w-[420px] flex flex-col gap-2">
              <p className="text-[16px] font-semibold">Social media URL</p>
              <div className="h-[80px] overflow-auto text-[14px] font-normal">
                {profile.socialMediaURL || profile.link ? (
                  <a
                    href={profile.socialMediaURL || profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline break-words"
                  >
                    {profile.socialMediaURL || profile.link}
                  </a>
                ) : (
                  "Холбоос байхгүй байна."
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersCard;
