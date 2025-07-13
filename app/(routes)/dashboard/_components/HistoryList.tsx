"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div className="mt-10">
      {historyList.length == 0 ? (
        <div className="flex flex-col items-center gap-2 border-2 border-gray-200 rounded-2xl p-10">
          <Image src={'/medical-assistance.png'} height={150} width={150} alt="Medical Assistance"/>
          <h1 className="text-3xl font-semibold">No Recent Consultations</h1>
          <p className="">You Don't Have Any Doctor Consultations</p>
          <Button>Consult Now</Button>
        </div>
      ) : (
        <div>You do  have history now</div>
      )}
    </div>
  );
};

export default HistoryList;
