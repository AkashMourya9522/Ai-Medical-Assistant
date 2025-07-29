import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Hospital } from "lucide-react";


const menuItems = [
  { id: 1, name: "Home", path: "/dashboard" },
  { id: 2, name: "History", path: "/dashboard/history" },
  { id: 3, name: "Pricing", path: "/dashboard/pricing" },
  { id: 4, name: "Profile", path: "/dashboard/profile" },
];

const AppHeader = async () => {
  const { has } = await auth();
  const hasPro = has({ plan: "pro" });


  return (
    <div className="flex items-center justify-around p-5 shadow-md">
        <Link href={'/dashboard'}>
      <div className="flex items-center">
        <Image
          src={"/logo.svg"}
          alt="Ai Medical Agent"
          height={75}
          width={75}
        />
        <h1 className="ml-2 hidden md:flex md:gap-2 items-center font-semibold">
          AI Medical Voice Agent <Hospital className="text-green-600" />
        </h1>
      </div>
      </Link>
      <div className="hidden sm:flex items-center gap-10">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.path}>
            <span className="hover:font-bold transition-all">{item.name}</span>
          </Link>
        ))}
      </div>
      <Badge variant={"outline"}>
        {" "}
        {hasPro && <span>Pro User 🌟</span>}
        <UserButton />
      </Badge>
    </div>
  );
};

export default AppHeader;
