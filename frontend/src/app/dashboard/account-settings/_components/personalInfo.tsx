"use client";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/app/_api/_components/updateUserProfile";

function PersonalInfo() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [social, setSocial] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("Retrieved userId:", userId); // Debug: Log userId
    if (userId) setId(userId);
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

  const handleSubmit = async () => {
    if (!id) {
      setError("User ID not found. Please log in again.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const profileData = {
        id,
        name: name.trim(),
        about: about.trim(),
        avatarImage: image || "",
        socialMediaURL: social.trim(),
      };

      console.log("Submitting profile data:", profileData); // Debug: Log data
      await updateUserProfile(profileData);
      setSuccess("Changes saved successfully!");
      setError(null);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to save changes. Please try again.");
      setSuccess(null);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Personal Info</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <div className="flex flex-col w-[160px] gap-2">
        <p className="text-[14px] font-medium">Add photo</p>
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
        <p className="text-[14px] font-medium">Name</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium">About</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Add text about yourself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium">Social media URL</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Add your social media URL"
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
        {isLoading ? "Saving..." : "Save changes"}
      </Button>
    </div>
  );
}

export default PersonalInfo;