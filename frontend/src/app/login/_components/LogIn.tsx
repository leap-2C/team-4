"use client";

import React, { useState } from "react";
import { Coffee, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { login } from "@/app/_api/_components/Login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleContinueButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email-ээ оруулна уу");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Зөв и-мэйл хаяг оруулна уу");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Нууц үгээ оруулна уу");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Нууц үг дор хаяж 8 тэмдэгттэй, том жижиг үсэг болон тоо агуулсан байх ёстой"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const response = await login({ email, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);

      router.push("/Dashboard/home");
    } catch (error: any) {
      setServerError("Имэйл эсвэл нууц үг буруу байна");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    setEmailError("");
    setPasswordError("");
    setServerError("");
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[50%] h-full bg-amber-400 flex flex-col items-center justify-center relative">
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
          onClick={() => router.push("/signup")}
          className="w-[83px] h-[40px] rounded-md bg-secondary text-black absolute top-[32px] right-[80px]"
        >
          Sign up
        </Button>

        <p className="text-[24px] font-semibold w-[407px] h-[80px] p-[24px]">
          Welcome back
        </p>

        <form
          onSubmit={handleContinueButton}
          className="w-[407px] h-[304px] p-[24px] pt-0"
        >
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

          <div className="flex flex-col gap-2 mb-3">
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

          {serverError && (
            <p className="text-red-500 text-sm text-center mb-3">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            className="w-[359px] h-[40px] rounded-md"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
