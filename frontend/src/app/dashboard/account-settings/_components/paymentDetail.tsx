"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Selectcountry from "./selectcountry";
import { Input } from "@/components/ui/input";
import { createpaymentDetails } from "@/app/api"; 

function PaymentDetails() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "", 
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    handleChange("cardNumber", value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      value = value.replace(/(\d{2})(?=\d)/g, "$1/");
    }
    handleChange("expiry", value);
  };

  const handleSaveChanges = async () => {
    console.log(formData);

    try {
      const response = await createpaymentDetails({
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiry,
        cvv: formData.cvv,
        cardHolderName: `${formData.firstName} ${formData.lastName}`,
        country: formData.country,
      });
      if (!response) {
        throw new Error("Payment details not saved");
      }
      console.log(response);
      alert("Payment details saved successfully");
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-[#E4E4E7] rounded-[8px] p-4">
      <p className="font-bold">Payment details</p>

      <div>
        <p className="text-[14px] font-medium mb-4">Select country</p>
        <Selectcountry
          value={formData.country}
          onChange={(value: string) => handleChange("country", value)}
        />
      </div>

      <div className="flex flex-row w-[602px] gap-4">
        <div>
          <p className="text-[14px] font-medium">First name</p>
          <Input
            className="w-[200px] mt-2"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <p className="text-[14px] font-medium">Last name</p>
          <Input
            className="w-[200px] mt-2"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="text-[14px] font-medium">Enter card number</p>
        <Input
          type="text"
          inputMode="numeric"
          value={formData.cardNumber}
          onChange={handleCardNumberChange}
          className="w-[602px] mt-2"
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
        />
      </div>

      <div className="flex flex-row w-[602px] gap-4">
        <div>
          <p className="text-[14px] font-medium">Expiration date</p>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            className="w-[200px] mt-2"
            value={formData.expiry}
            onChange={handleExpiryChange}
            maxLength={5}
          />
        </div>
        <div>
          <p className="text-[14px] font-medium">CVV</p>
          <Input
            type="password"
            inputMode="numeric"
            placeholder="CVV"
            className="w-[200px] mt-2"
            value={formData.cvv}
            onChange={(e) => handleChange("cvv", e.target.value)}
            maxLength={3}
          />
        </div>
      </div>

      <Button
        className="w-[602px] mt-4"
        variant="default"
        onClick={handleSaveChanges}
      >
        Save changes
      </Button>
    </div>
  );
}

export default PaymentDetails;
