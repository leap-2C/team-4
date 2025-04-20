import React from 'react'

const LoginAndSignUp = () => {

  
  return (
    <div className="w-[152.81px] flex gap-3">
      <a
        href="/signup"
        className="w-[75px] h-[36px] flex items-center justify-center bg-black text-white text-sm rounded-lg font-medium"
      >
        Sign Up
      </a>
      <a
        href="/Login"
        className="w-[75px] h-[36px] flex items-center justify-center bg-secondary text-sm rounded-lg font-medium"
      >
        Log in
      </a>
    </div>
  );
}

export default LoginAndSignUp