"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Camera, Coffee, Check, ChevronsUpDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
import { createUserProfile } from "@/app/api";

type CountryOption = {
  value: string;
  label: string;
};

const Complete = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [value, setValue] = useState("");
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [openCountry, setOpenCountry] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cvc, setCvc] = useState("");

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
          .sort((a: CountryOption, b: CountryOption) => a.label.localeCompare(b.label));
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

  const handleYearSelect = (selectedYear: string) => {
    setYear((prevYear) => (prevYear === selectedYear ? "" : selectedYear));
    setOpenYear(false);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmitProfile = async () => {
    try {
      const userId = "1234"; // Replace with real user ID logic if available

      const userProfile = {
        id: userId,
        name: name,
        about: about,
        AvatarImage: image || "",
        socialMediaURL: socialMediaURL,
        backgroundImage: "",
        successMessage: "Profile created successfully!",
      };

      await createUserProfile(userProfile);
      router.push("/dashboard/home");
    } catch (error) {
      console.error("Failed to create profile", error);
      alert("Failed to create profile");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center flex-col">
      <div className="h-[56px] w-full flex flex-row items-center justify-between px-[80px] bg-white">
        <button onClick={() => router.push("/dashboard/home")} className="flex gap-2 items-center">
          <Coffee className="w-[20px] h-[20px]" />
          <p className="text-[16px] font-bold">Buy Me Coffee</p>
        </button>
        <div className="flex gap-3 items-center">
          <Button>Log out</Button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-full">
        {step === 1 && (
          <div className="w-[510px] gap-[24px] flex flex-col">
            <p className="text-[24px] font-[600]">Complete your profile page</p>
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

            <div className="flex flex-col gap-[12px]">
              <div>
                <p>Name</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-[40px]"
                  type="text"
                  placeholder="Enter your name here"
                />
              </div>
              <div>
                <p>About</p>
                <Input
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="h-[131px]"
                  type="text"
                  placeholder="Write about yourself here"
                />
              </div>
              <div>
                <p>Social media URL</p>
                <Input
                  value={socialMediaURL}
                  onChange={(e) => setSocialMediaURL(e.target.value)}
                  className="h-[40px]"
                  type="text"
                  placeholder="http://"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNextStep} className="w-[246px] h-[40px] bg-secondary text-white">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-[510px] gap-[24px] flex flex-col">
            <p className="text-[24px] font-[600]">How would you like to be paid?</p>
            <p>Enter location and payment details</p>

            <div>
              <p>Select country</p>
              <Popover open={openCountry} onOpenChange={setOpenCountry}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={openCountry} className="justify-between w-full">
                    {value ? countries.find((c) => c.value === value)?.label : "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
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
                            onSelect={() => {
                              setValue(country.value);
                              setOpenCountry(false);
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", value === country.value ? "opacity-100" : "opacity-0")}
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

            <div className="flex gap-2">
              <Input
                className="h-[40px] w-1/2"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                className="h-[40px] w-1/2"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <Input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full mt-2"
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
            />

            <div className="flex gap-2">
              <Popover open={openMonth} onOpenChange={setOpenMonth}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {month ? months.find((m) => m.value === month)?.label : "Select month..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {months.map((monthItem) => (
                          <CommandItem
                            key={monthItem.value}
                            onSelect={() => {
                              setMonth(monthItem.value);
                              setOpenMonth(false);
                            }}
                          >
                            {monthItem.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover open={openYear} onOpenChange={setOpenYear}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {year || "Select year..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {years.map((yearItem) => (
                          <CommandItem key={yearItem} onSelect={() => handleYearSelect(yearItem.toString())}>
                            {yearItem}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Input
                className="h-[36px] w-[100px]"
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmitProfile} className="w-[246px] h-[40px] bg-secondary text-white">
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
