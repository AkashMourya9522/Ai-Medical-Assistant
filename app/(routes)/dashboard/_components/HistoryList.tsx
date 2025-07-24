"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSession from "./AddNewSession";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import HistoryTable from "./HistoryTable";
import { sessionDetailsType } from "../voice-call/[sessionId]/page";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<sessionDetailsType[]>([]);

  useEffect(()=>{
    GetHistoryList();
  },[])


  async function GetHistoryList(){
    const response = await axios.get('/api/session-chat?sessionId=all')
    console.log(response.data)
    setHistoryList(response.data);
  }
  return (
    <div className="mt-10">
      {historyList.length == 0 ? (
        <div className="flex flex-col items-center gap-2 border-2 border-gray-200 rounded-2xl p-10">
          <Image src={'/medical-assistance.png'} height={150} width={150} alt="Medical Assistance"/>
          <h1 className="text-3xl font-semibold">No Recent Consultations</h1>
          <p className="">You Don't Have Any Doctor Consultations</p>
          <AddNewSession/>
        </div>
      ) : (
        <HistoryTable historyList={historyList}/>
      )}
    </div>
  )
}

export default HistoryList;
