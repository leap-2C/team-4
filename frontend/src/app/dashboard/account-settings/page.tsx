import React from "react";
import Personalinfo from "./_components/personalInfo";
import SetPassword from "./_components/newPassword";
import Paymentdetails from "./_components/paymentDetail";
import SuccessPage from "./_components/successPage";
function Page() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-[24px]">My Account</p>
      <Personalinfo />
      <SetPassword />
      <Paymentdetails />
      <SuccessPage />
    </div>
  );
}

export default Page;
