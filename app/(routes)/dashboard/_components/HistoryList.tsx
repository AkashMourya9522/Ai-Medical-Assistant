"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSession from "./AddNewSession";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { sessionDetailsType } from "../voice-call/[sessionId]/page";
import { Loader2 } from "lucide-react";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<sessionDetailsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetHistoryList();
  }, []);

  async function GetHistoryList() {
    const response = await axios.get("/api/session-chat?sessionId=all");
    console.log(response.data);
    setHistoryList(response.data);
    setLoading(false);
  }
  return (
    <div className="mt-10">
      {loading ? (
        <div className="flex justify-center items-center h-60">
    <Loader2 className="animate-spin" size={64} />
  </div>
      ) : (
        <div>
          {historyList.length == 0 ? (
            <div className="flex flex-col items-center gap-2 border-2 border-gray-200 rounded-2xl p-10">
              <Image
                src={"/medical-assistance.png"}
                height={150}
                width={150}
                alt="Medical Assistance"
              />
              <h1 className="text-3xl font-semibold">
                No Recent Consultations
              </h1>
              <p className="">You Don't Have Any Doctor Consultations</p>
              <AddNewSession />
            </div>
          ) : (
            <HistoryTable historyList={historyList} />
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
