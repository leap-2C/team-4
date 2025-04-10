"use client";

import React, { useState } from "react";
import { Coffee } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>(""); 
  const [passwordError, setPasswordError] = useState<string>(""); 

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; 

  const router = useRouter();

  const handleContinueButton = (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    if (email === "") {
      setEmailError("Emailaa hiide bandia");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); 
    }

    // Password validation
    if (password === "") {
      setPasswordError("Passwordaa hiide bandia");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include a number, an uppercase and a lowercase letter."
      );
    } else {
      setPasswordError(""); 
    }

    if (email && password && !emailError && !passwordError) {
      router.push("/dashboard/home");
    }
  };

  const handleSignUpButton = () => {
    router.push("/signup");
  };

  const handleFocus = () => {
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[50%] h-full bg-amber-400 flex flex-col items-center justify-center">
        <div className="flex gap-2 items-center absolute top-[32px] left-[80px]">
          <div>
            <Coffee className="w-[20px] h-[20px]" />
          </div>
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="w-[455px] h-[370px] flex flex-col items-center gap-10">
          <div className="">
            <Image
              src="/coffe.png"
              alt="login"
              width={240}
              height={240}
              className="w-[240px] h-[240px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <p className="font-bold text-[24px]">Fund your creative work</p>
            <p className="font-normal text-[16px] text-center">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-full bg-white flex flex-col items-center justify-center ">
        <Button
          onClick={handleSignUpButton}
          className="w-[83px] h-[40px] rounded-md bg-secondary text-black absolute top-[32px] right-[80px]"
        >
          Sign up
        </Button>
        <p className="text-[24px] font-semibold w-[407px] h-[80px] p-[24px]">
          Welcome back
        </p>
        <div className="w-[407px] h-[304px] p-[24px] pt-0">

          <div className="flex flex-col gap-2 mb-3">
            <p className="text-[14px] font-medium">Email</p>
            <Input
              className="w-[359px] h-[40px] rounded-md"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
            />
       
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
  
          <div className="flex flex-col gap-2 mb-6">
            <p className="text-[14px] font-medium">Password</p>
            <Input
              className="w-[359px] h-[40px] rounded-md"
              placeholder="Enter password here"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus} 
            />
     
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <Button
            onClick={handleContinueButton}
            className="w-[359px] h-[40px] rounded-md"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
