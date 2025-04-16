"use client";
import React, { useState, useEffect, useRef } from "react";
import { Coffee, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginAndSignUp from "./_components/LoginSignup";
import { getUserProfile } from "../api";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState<{
    name: string;
    AvatarImage: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (token) {
      setIsLoggedIn(true);
      if (email) setUserEmail(email);
      getUserProfile()
        .then((profile) => {
          setUserProfile({
            name: profile.name || "",
            AvatarImage: profile.AvatarImage || "",
          });
        })
        .catch((error) => {
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserProfile(null);
    router.push("/login");
  };

  const handleOpen = () => setOpen(!open);

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
    <div className="h-[56px] w-full flex flex-row items-center justify-between px-[80px] bg-white">
      <button
        onClick={() => router.push("/dashboard/home")}
        className="flex gap-2 items-center"
      >
        <Coffee className="w-[20px] h-[20px]" />
        <p className="text-[16px] font-bold">Buy Me Coffee</p>
      </button>
      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleOpen}
          >
            <Avatar className="h-[40px] w-[40px]">
              <AvatarImage
                src={
                  userProfile?.AvatarImage
                }
                alt={userProfile?.name || userEmail || "User"}
              />
              <AvatarFallback>
                {(userProfile?.name || userEmail || "U")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="pr-[20px] font-medium text-sm">
              {userProfile?.name || userEmail || "User"}
            </p>
            <ChevronDown className="h-[16px] w-[16px]" />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-[140px] bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <Button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      ) : (
        <LoginAndSignUp />
      )}
    </div>
  );
};

export default Header;