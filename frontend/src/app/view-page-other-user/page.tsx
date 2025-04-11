import React from "react";
import Header from "../Header/header";
import Leftside from "./_components/lefto";
import Rightside from "./_components/righto";
function Page() {
  return (
    <div className="relative w-screen h-screen">
      <Header />
      <img
        src="https://cdn.mos.cms.futurecdn.net/HuGGeENt6kGyixe3hT9tnY.jpg"
        alt="Background"
        className="w-screen h-[320px] object-cover"
      />
      <div className="absolute top-[20%] w-[100%] z-30 flex gap-[24px] justify-center">
        <Leftside />
        <Rightside />   
      </div>
    </div>
  );
}

export default Page;
