"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/app/_api/_components/updateUserProfile";

function SuccessPage() {
  const [confirmationText, setConfirmationText] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("Retrieved userId:", userId); // Debug: Log userId
    if (userId) setId(userId);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleButtonClick = async () => {
    if (!id) {
      setError("User ID not found. Please log in again.");
      return;
    }

    setIsLoading(true); 
    try {
      const profileData = {
        id,
        successMessage: confirmationText.trim(),
        name: "", 
        about: "", 
        avatarImage: "", 
        socialMediaURL: "",
        backgroundImage: "", 
      };

      console.log("Submitting confirmation data:", profileData); 
      await updateUserProfile(profileData);
      setSuccess("Confirmation message saved successfully!");
      setError(null);
      if (inputRef.current) inputRef.current.value = "";
      setConfirmationText("");
    } catch (error: any) {
      console.error("Error saving confirmation message:", error);
      setError(error.message || "Failed to save confirmation message.");
      setSuccess(null);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Success page</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <div>
        <p className="text-[14px] font-medium">Confirmation message</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Add confirmation text"
          ref={inputRef}
          value={confirmationText}
          onChange={handleInputChange}
        />
      </div>

      <Button
        onClick={handleButtonClick}
        className="w-[602px] mt-4"
        variant="default"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save changes"}
      </Button>
    </div>
  );
}

export default SuccessPage;