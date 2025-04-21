"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Coffee } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/app/_api/_components/SignUp";

function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async () => {
    let valid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!emailRegex.test(email)) {
      newErrors.email = "Зөв имэйл хаяг оруулна уу.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Нууц үгнүүд таарахгүй байна.";
      valid = false;
    }

    setErrors(newErrors);
    setSuccessMessage("");

    if (valid) {
      setLoading(true);
      try {
        const response = await signUp({
          name: username,
          email,
          password,
        });
        console.log("Signup response:", response);
        
        setSuccessMessage("Бүртгэл амжилттай! Хуудсыг шилжүүлж байна...");
        setTimeout(() => router.replace("/complete"), 2000);
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          email: error.message || "Бүртгэл амжилтгүй. Дахин оролдоно уу.",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-lg font-medium">Таны бүртгэлийг үүсгэж байна...</div>
        </div>
      )}
      <div className="w-screen h-screen flex">
        <div className="w-[50%] h-full bg-amber-400 flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center absolute top-[32px] left-[80px]">
            <Coffee className="w-[20px] h-[20px]" />
            <p className="text-[16px] font-bold">Buy Me Coffee</p>
          </div>
          <div className="w-[455px] h-[370px] flex flex-col items-center gap-10">
            <Image
              src="/coffe.png"
              alt="Бүртгэл"
              width={240}
              height={240}
              className="w-[240px] h-[240px] object-cover"
            />
            <div className="flex flex-col gap-3 items-center text-center">
              <p className="font-bold text-[24px]">Таны бүтээлч ажлыг санхүүжүүл</p>
              <p className="font-normal text-[16px]">
                Дэмжлэг хүлээн ав. Гишүүнчлэл эхлүүл. Дэлгүүр нээ. Энэ нь таны бодсоноос хялбар.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[50%] h-full bg-white flex flex-col items-center justify-center relative">
          <Button
            onClick={() => router.replace("/login")}
            className="w-[83px] h-[40px] rounded-md bg-secondary text-black absolute top-[32px] right-[80px]"
          >
            Нэвтрэх
          </Button>
          <div className="p-[22px] w-[403px]">
            <p className="text-[24px] font-semibold">Бүртгэл Үүсгэх</p>
            <p className="text-[14px] text-[#71717A]">
              Таны хуудасны хэрэглэгчийн нэрийг сонгоно уу
            </p>
          </div>

          {successMessage && (
            <div className="w-[359px] p-2 mb-4 bg-green-100 text-green-700 rounded-md text-center">
              {successMessage}
            </div>
          )}

          <div className="flex flex-col gap-2 pb-[24px]">
            <p className="text-[14px] font-medium">Хэрэглэгчийн нэр</p>
            <Input
              className="w-[359px] h-[40px] rounded-md"
              placeholder="Энд хэрэглэгчийн нэр оруулна уу"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 pb-[24px]">
            <p className="text-[14px] font-medium">Имэйл</p>
            <Input
              className={`w-[359px] h-[40px] rounded-md ${
                errors.email && "border-red-500"
              }`}
              placeholder="Энд имэйл оруулна уу"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 pb-[24px]">
            <p className="text-[14px] font-medium">Нууц үг</p>
            <Input
              type="password"
              className={`w-[359px] h-[40px] rounded-md ${
                errors.password && "border-red-500"
              }`}
              placeholder="Энд нууц үг оруулна уу"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 pb-[24px]">
            <p className="text-[14px] font-medium">Нууц үг баталгаажуулах</p>
            <Input
              type="password"
              className={`w-[359px] h-[40px] rounded-md ${
                errors.confirmPassword && "border-red-500"
              }`}
              placeholder="Энд нууц үг оруулна уу"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <Button
            onClick={handleSignup}
            className="w-[359px] h-[40px] rounded-md"
          >
            Үргэлжлүүл
          </Button>
        </div>
      </div>
    </>
  );
}

export default Signup;  