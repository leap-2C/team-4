"use client";
import React, { useState, useEffect, useRef } from "react";
import { Coffee, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginAndSignUp from "./_components/LoginSignup";
import { getUserProfile } from "../_api/_components/GetUserProfile";

// Define the shape of the user profile
interface UserProfile {
  name: string;
  avatarImage: string;
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserProfile(null);
    router.push("/"); 
  };

  const handleOpen = () => setOpen((prev) => !prev);

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

  return (
    <header className="h-[56px] w-full flex flex-row items-center justify-between px-[80px] bg-white">
      <button
        onClick={() => router.push("/dashboard/home")}
        className="flex gap-2 items-center"
        aria-label="Go to dashboard"
      >
        <Coffee className="w-[20px] h-[20px]" />
        <p className="text-[16px] font-bold">Buy Me Coffee</p>
      </button>
      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleOpen}
            aria-expanded={open}
            aria-controls="dropdown-menu"
          >
            <Avatar className="h-[40px] w-[40px]">
              <AvatarImage
                src={userProfile?.avatarImage || "/default-avatar.png"} // Fallback image
                alt={userProfile?.name || "User"}
              />
              <AvatarFallback>
                {(userProfile?.name || "U")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="pr-[20px] font-medium text-sm">
              {userProfile?.name || "User"}
            </p>
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
                Logout
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