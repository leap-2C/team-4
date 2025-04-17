"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatepassword } from "@/app/_api/_components/Password";

function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userId = localStorage.getItem("userId") || "";

    try {
      await updatepassword({ id: userId, password });
      setSuccess("Password updated successfully");
      setError(null);

      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4"
    >
      <p className="font-bold">Set a new password</p>

      <div>
        <p className="text-[14px] font-medium">New password</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Enter new password"
          type="password"
          value={password}
          ref={passwordRef}
          onChange={handlePasswordChange}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium">Confirm password</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          ref={confirmPasswordRef}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <Button type="submit" className="w-[602px] mt-4" variant="default">
        Save changes
      </Button>
    </form>
  );
}

export default SetPassword;
