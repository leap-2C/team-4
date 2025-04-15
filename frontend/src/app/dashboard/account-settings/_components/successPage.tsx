"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function successPage() {
  const [confirmationText, setConfirmationText] = useState("");
  const inputRef = useRef(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(event.target.value);
  };
  const handleButtonClick = () => {
   
  };
  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Success page</p>
      <div>
        <p className="text-[14px] font-medium">Confirmation message</p>
        <Input
          className="w-[602px]  mt-2"
          placeholder="Add confirmation text"
          onChange={handleInputChange}
        />
      </div>

      <Button onClick={handleButtonClick} className="w-[602px] mt-4" variant="default">
        Save changes
      </Button>
    </div>
  );
}
export default successPage;
