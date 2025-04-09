"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Selectcountry from "./selectcountry";
import { Input } from "@/components/ui/input";
import CardNumberInput from "./cardNumber";
function paymentDetails() {
  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Payment details</p>
      <div>
        <p className="text-[14px] font-medium mb-4">Select country</p>
        <Selectcountry />
      </div>
      <div className="flex flex-row w-[602px] gap-4">
        <div>
          <p className="text-[14px] font-medium">First name</p>
          <Input className="w-[200px]  mt-2" placeholder="First name" />
        </div>
        <div>
          <p className="text-[14px] font-medium">Last name</p>
          <Input className="w-[200px]  mt-2" placeholder="Last name" />
        </div>
      </div>
      <CardNumberInput />
      <div className="flex flex-row w-[602px] gap-4">
        <div>
          <p className="text-[14px] font-medium">Expiration date</p>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            className="w-[200px] mt-2"
          />
        </div>
        <div>
          <p className="text-[14px] font-medium">CVV</p>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="CVV"
            className="w-[200px] mt-2"
          />
        </div>
      </div>
      
      <Button className="w-[602px] mt-4" variant="default">
        Save changes
      </Button>
    </div>
  );
}

export default paymentDetails;
