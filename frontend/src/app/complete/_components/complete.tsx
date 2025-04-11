"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { Coffee } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CountryOption = {
  value: string;
  label: string;
};

const Complete = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [openCountry, setOpenCountry] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const [value, setValue] = useState("");
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: 70 }, (_, i) => 1950 + i);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const countryOptions: CountryOption[] = data
          .map((country: any) => ({
            value: country.cca2?.toLowerCase() || country.name.common.toLowerCase(),
            label: country.name.common,
          }))
          .sort((a: CountryOption, b: CountryOption) =>
            a.label.localeCompare(b.label)
          );
        setCountries(countryOptions);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardNumber(value);
    }
  };

  const handleYearSelect = (selectedYear: string) => {
    setYear((prevYear) => (prevYear === selectedYear ? "" : selectedYear));
    setOpenYear(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    alert("Form submitted");
  };
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

  return (
    <div className="w-screen h-screen flex items-center flex-col">
        <div className='h-[56px] w-full flex  flex-row items-center justify-between px-[80px] bg-white'>
            <button onClick={()=>router.push("/dashboard/home")} className="flex gap-2 items-center ">
                <div>
                    <Coffee className="w-[20px] h-[20px]" />
                </div>
                <p className="text-[16px] font-bold">Buy Me Coffee</p>
            </button>
            <div className='flex gap-3 items-center'>
              <Button>Log out</Button>
            </div>
        </div>
        <div className="flex justify-center items-center w-full h-full">
      {step === 1 && (
        <div className="w-[510px] gap-[24px] flex flex-col">
          <div className="flex flex-col gap-[24px]">
            <p className="text-[24px] font-[600] line-weight-[32px]">Complete your profile page</p>
            <div className="gap-[8px] flex flex-col">
              <p>Add photo</p>
              <Avatar
                className="w-[160px] h-[160px] cursor-pointer hover:opacity-80 transition flex items-center justify-center relative"
                onClick={triggerFileInput}
              >
                <Camera className="absolute opacity-[0.2] w-10 h-10" />
                <AvatarImage
                  src={
                    image ||
                    "https://w7.pngwing.com/pngs/754/473/png-transparent-avatar-boy-man-avatar-vol-1-icon.png"
                  }
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[8px]">
              <p>Name</p>
              <Input className="h-[40px]" type="text" placeholder="Enter your name here" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p>About</p>
              <Input className="h-[131px]" type="text" placeholder="Write about yourself here" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p>Social media URL</p>
              <Input className="h-[40px]" type="text" placeholder="http://" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleNextStep} className="w-[246px] h-[40px] bg-secondary text-[white]">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-[510px] gap-[24px] flex flex-col">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] font-[600] line-weight-[32px]">How would you like to be paid?</p>
            <p>Enter location and payment details</p>
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <p>Select country</p>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountry}
                    className=" justify-between"
                  >
                    {value
                      ? countries.find((country) => country.value === value)?.label
                      : "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.value}
                            value={country.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue);
                              setOpenCountry(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === country.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {country.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-[8px] justify-between">
              <div>
                <p>First name</p>
                <Input className="h-[40px] w-[249px]" type="text" placeholder="Enter your name here" />
              </div>
              <div>
                <p>Last name</p>
                <Input className="h-[40px] w-[249px]" type="text" placeholder="Enter your name here" />
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <div>
                <p className="text-[14px] font-medium">Enter card number</p>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-[100%] mt-2"
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                />
              </div>
            </div>

            <div className="flex gap-[16px] justify-between">
              <div>
                <p>Expires</p>
                <Popover open={openMonth} onOpenChange={setOpenMonth}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openMonth}
                      className="w-[159px] justify-between"
                    >
                      {month ? months.find((m) => m.value === month)?.label : "Select month..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search month..." />
                      <CommandList>
                        <CommandEmpty>No month found.</CommandEmpty>
                        <CommandGroup>
                          {months.map((monthItem) => (
                            <CommandItem
                              key={monthItem.value}
                              value={monthItem.value}
                              onSelect={() => {
                                setMonth(monthItem.value === month ? "" : monthItem.value);
                                setOpenMonth(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${month === monthItem.value ? "opacity-100" : "opacity-0"}`}
                              />
                              {monthItem.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <p>Year</p>
                <Popover open={openYear} onOpenChange={setOpenYear}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openYear}
                      className="w-[159px] justify-between"
                    >
                      {year ? year : "Select year..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search year..." />
                      <CommandList>
                        <CommandEmpty>No year found.</CommandEmpty>
                        <CommandGroup>
                          {years.map((yearItem) => (
                            <CommandItem
                              key={yearItem}
                              onSelect={() => handleYearSelect(yearItem.toString())}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${year === yearItem.toString() ? "opacity-100" : "opacity-0"}`}
                              />
                              {yearItem}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <p>CVC</p>
                <Input className="h-[36px] w-[159px]" type="text" placeholder="CVC" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} className="w-[246px] h-[40px] bg-secondary text-[white]">
              Continue
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
    
  );
};

export default Complete;
