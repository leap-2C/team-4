import React, { useState } from "react";
import { Input } from "@/components/ui/input";

function CardNumberInput() {
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardNumber(value);
    }
  };

  return (
    <div>
      <p className="text-[14px] font-medium">Enter card number</p>
      <Input
        type="text"
        inputMode="numeric"
        value={cardNumber}
        onChange={handleCardNumberChange}
        className="w-[602px] mt-2"
        placeholder="XXXX XXXX XXXX XXXX"
        maxLength={19} 
      />
    </div>
  );
}

export default CardNumberInput;
