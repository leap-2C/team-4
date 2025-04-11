import React from "react";
import Header from "../Header/header";
import CoverPictureStyle from "./_components/CoverPictureStyle";
import LeftEditSide from "./_components/LeftEditSide";
import RightSide from "./_components/RightSide";

function viewPage() {
  return (
    <div className="relative w-screen h-screen">
      <Header />
      <CoverPictureStyle />
      <div className="absolute top-[20%] w-[100%] z-30 flex gap-[24px] justify-center">
        <LeftEditSide />
        <RightSide />
      </div>
    </div>
  );
}

export default viewPage;
