import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function setPassword() {
  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Set a new password</p>
      <div>
        <p className="text-[14px] font-medium">New password</p>
        <Input className="w-[602px] mt-2" placeholder="Enter new password" />
      </div>
      <div>
        <p className="text-[14px] font-medium">Confirm password</p>
        <Input className="w-[602px] mt-2" placeholder="Confirm password" />
      </div>
      <Button className="w-[602px] mt-4" variant="default">
        Save changes
      </Button>
    </div>
  );
}
export default setPassword;
