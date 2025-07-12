"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser()
  const createUser = async () => {
    const response = await axios.post("/api/users/");
    console.log(response.data);
  };
  useEffect(() => {
    user && createUser();
  }, [user]);
  return <div>{children}</div>;
}

export default provider;
