"use client"
import React from 'react';
import { Coffee } from 'lucide-react';
import { useRouter } from "next/navigation";
const Header = () => {
    const router = useRouter();
    return (
        <div className='h-[56px] w-full flex  flex-row items-center justify-between px-[7%] bg-white'>
            <button onClick={()=>router.push("/dashboard/home")} className="flex gap-2 items-center ">
                <div>
                    <Coffee className="w-[20px] h-[20px]" />
                </div>
                <p className="text-[16px] font-bold">Buy Me Coffee</p>
            </button>
            <div>profile</div>
        </div>
    );
};

export default Header;
