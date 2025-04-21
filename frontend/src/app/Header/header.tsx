"use client";

import React, { useState, useEffect, useRef } from "react";
import { Coffee, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginAndSignUp from "./_components/LoginSignup";
import { getUserProfile } from "../_api/_components/GetUserProfile";

interface UserProfile {
  name: string;
  avatarImage: string;
}

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      setUserProfile({
        ...profile,
        avatarImage:
          profile.avatarImage ||
          "https://w7.pngwing.com/pngs/754/473/png-transparent-avatar-boy-man-avatar-vol-1-icon.png",
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (token && userId) {
      fetchUserProfile(userId).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Profile шинэчлэгдсэн event-ийг барих
  useEffect(() => {
    const handleProfileUpdated = (event: Event) => {
      const userId = (event as CustomEvent).detail.userId;
      if (userId) {
        fetchUserProfile(userId);
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () =>
      window.removeEventListener("profileUpdated", handleProfileUpdated);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const handleToggleDropdown = () => setOpen((prev) => !prev);

  return (
    <header className="h-[56px] w-full flex items-center justify-between px-[80px] bg-white border-b">
      <button
        onClick={() => router.push("/dashboard/home")}
        className="flex gap-2 items-center"
        aria-label="Go to dashboard"
      >
        <Coffee className="w-[20px] h-[20px]" />
        <p className="text-[16px] font-bold">Buy Me Coffee</p>
      </button>

      {loading ? (
        <div className="text-sm font-medium">Түр хүлээнэ үү...</div>
      ) : isLoggedIn && userProfile ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleToggleDropdown}
            aria-expanded={open}
            aria-controls="dropdown-menu"
          >
            <Avatar className="h-[40px] w-[40px]">
              <AvatarImage
                src={userProfile.avatarImage}
                alt={userProfile.name || "User"}
              />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="pr-[20px] font-medium text-sm">{userProfile.name}</p>
            <ChevronDown className="h-[16px] w-[16px]" />
          </button>

          {open && (
            <div
              id="dropdown-menu"
              className="absolute right-0 mt-2 w-[140px] bg-white rounded-md shadow-lg border border-gray-200 z-50"
            >
              <Button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm"
                variant="ghost"
              >
                Гарах
              </Button>
            </div>
          )}
        </div>
      ) : (
        <LoginAndSignUp />
      )}
    </header>
  );
};

export default Header;
