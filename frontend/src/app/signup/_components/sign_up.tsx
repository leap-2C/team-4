"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Coffee } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/app/api";

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSignup = async () => {
    let valid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters with a letter and a number.";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    setSuccessMessage("");

    if (valid) {
      try {
        const response = await signUp({
          name: username,
          email,
          password,
        });
        setSuccessMessage("Signup successful! Redirecting...");
        setTimeout(() => router.replace("/complete"), 2000);
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          email: error.message || "Signup failed. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[50%] h-full bg-amber-400 flex flex-col items-center justify-center">
        <div className="flex gap-2 items-center absolute top-[32px] left-[80px]">
          <Coffee className="w-[20px] h-[20px]" />
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="w-[455px] h-[370px] flex flex-col items-center gap-10">
          <Image
            src="/coffe.png"
            alt="login"
            width={240}
            height={240}
            className="w-[240px] h-[240px] object-cover"
          />
          <div className="flex flex-col gap-3 items-center text-center">
            <p className="font-bold text-[24px]">Fund your creative work</p>
            <p className="font-normal text-[16px]">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[50%] h-full bg-white flex flex-col items-center justify-center relative">
        <Button
          onClick={() => router.replace("/login")}
          className="w-[83px] h-[40px] rounded-md bg-secondary text-black absolute top-[32px] right-[80px]"
        >
          Sign in
        </Button>
        <div className="p-[22px] w-[403px]">
          <p className="text-[24px] font-semibold">Create Your Account</p>
          <p className="text-[14px] text-[#71717A]">
            Choose a username for your page
          </p>
        </div>

        {successMessage && (
          <div className="w-[359px] p-2 mb-4 bg-green-100 text-green-700 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-2 pb-[24px]">
          <p className="text-[14px] font-medium">Username</p>
          <Input
            className="w-[359px] h-[40px] rounded-md"
            placeholder="Enter username here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 pb-[24px]">
          <p className="text-[14px] font-medium">Email</p>
          <Input
            className={`w-[359px] h-[40px] rounded-md ${
              errors.email && "border-red-500"
            }`}
            placeholder="Enter email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 pb-[24px]">
          <p className="text-[14px] font-medium">Password</p>
          <Input
            type="password"
            className={`w-[359px] h-[40px] rounded-md ${
              errors.password && "border-red-500"
            }`}
            placeholder="Enter password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 pb-[24px]">
          <p className="text-[14px] font-medium">Confirm password</p>
          <Input
            type="password"
            className={`w-[359px] h-[40px] rounded-md ${
              errors.confirmPassword && "border-red-500"
            }`}
            placeholder="Enter password here"
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
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Signup;