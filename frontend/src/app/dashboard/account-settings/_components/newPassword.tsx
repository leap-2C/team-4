"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatepassword } from "@/app/_api/_components/Password";

function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

    // Нууц үгийн валидаци
    if (password.length < 8) {
      setError("Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Нууц үгнүүд таарахгүй байна.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
      return;
    }

    setIsLoading(true);
    try {
      await updatepassword({ id: userId, password });
      setSuccess("Нууц үг амжилттай шинэчлэгдлээ!");
      setError(null);
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Нууц үг шинэчлэхэд алдаа гарлаа.");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4"
    >
      <p className="font-bold">Шинэ нууц үг тохируулах</p>

      <div>
        <p className="text-[14px] font-medium">Шинэ нууц үг</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Шинэ нууц үг оруулна уу"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium">Нууц үг баталгаажуулах</p>
        <Input
          className="w-[602px] mt-2"
          placeholder="Нууц үгийг дахин оруулна уу"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <Button
        type="submit"
        className="w-[602px] mt-4"
        variant="default"
        disabled={isLoading}
      >
        {isLoading ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
      </Button>
    </form>
  );
}

export default SetPassword;
