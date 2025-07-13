"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";

export type UserDetailsType = {
  name: string;
  email: string;
  credits: number;
};

function provider({ children }: Readonly<{ children: React.ReactNode }>) {

  const [userDetails, setUserDetails] = useState<any>(null);
  const user = useUser();
  try {
    const createUser = async () => {
    const response = await axios.post("/api/users");
    console.log("response from backend ", response.data);
    setUserDetails(response.data);
  };

  useEffect(() => {
    user && createUser();
  }, []);
  } catch (error) {
    console.log("There seems to be an error with the createUser thing",error)
  }

  

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        {children}
      </UserDetailContext.Provider>
    </div>
  );
}

export default provider;
