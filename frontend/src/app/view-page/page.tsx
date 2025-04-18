import React from "react";
import dynamic from "next/dynamic";
import Header from "../Header/header";
import CoverPictureStyle from "./_components/CoverPictureStyle";

import LeftEditSide from "./_components/LeftEditSide";
import RightSide from "./_components/RightSide";
function ViewPage() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center">
      <Header />
      <div className="z-0">
        <CoverPictureStyle />
      </div>
      <div className="absolute top-[320px] flex gap-[24px] justify-center">
        <div className="bg-white rounded-lg">
          <LeftEditSide />
        </div>
        <div className="bg-white rounded-lg">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default ViewPage;