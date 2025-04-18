"use client";

import React, { useState } from "react";
import { Coffee, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { login } from "@/app/_api/_components/Login";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginMessage, setLoginMessage] = useState<{ type: string; message: string } | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const router = useRouter();

  const handleContinueButton = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    setServerError("");
    setLoginMessage(null);
    setLoading(true);

    if (email.trim() === "") {
      setEmailError("Email-ээ оруулна уу");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Зөв и-мэйл хаяг оруулна уу");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
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
      console.log(response);

      setLoginMessage({ type: "success", message: "Амжилттай нэвтэрлээ!" });
      setTimeout(() => {
        router.push("/dashboard/home");
      }, 1000);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Имэйл эсвэл нууц үг буруу байна");
      }
      setLoginMessage({ type: "error", message: serverError || "Нэвтрэхэд алдаа гарлаа" });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginButton = () => {
    router.push("/signup");
  };

  const handleFocus = () => {
    setEmailError("");
    setPasswordError("");
    setServerError("");
    setLoginMessage(null);
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
          onClick={handleLoginButton}
          className="w-[83px] h-[40px] rounded-md bg-secondary text-black absolute top-[32px] right-[80s bg-secondary text-black absolute top-[32px] right-[80px]"
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
            onClick={handleContinueButton}
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
        </div>
      </div>
    </div>
  );
}

export default Login;