import React from "react";
import { Coffee } from "lucide-react";
import Image from "next/image";

function Login() {
  return (
    <div className="w-screen h-screen">
      <div className="w-[50%] h-full bg-amber-400">
        <div className="flex gap-2">
          <div>
            <Coffee className="w-[20px] h-[20px]" />
          </div>
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="w-[455px] h-[370px] flex flex-col items-center">
          <div className="">
            <Image
              src="/coffe.png"
              alt="login"
              width={240}
              height={240}
              className="w-[240px] h-[240px] object-cover"
            />
          </div>
          <p className="font-bold text-[24px]">Fund your creative work</p>
          <p className="font-normal text-[16px] text-center">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Login;
