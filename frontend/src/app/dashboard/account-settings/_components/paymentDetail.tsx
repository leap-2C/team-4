import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function paymentDetails() {
  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Payment details</p>
      <div>
        <p className="text-[14px] font-medium">Select country</p>
        
      </div>
    
      <Button className="w-[602px] mt-4" variant="default">
        Save changes
      </Button>
    </div>
  );
}
export default paymentDetails;
