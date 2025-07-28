"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { LoaderCircle  } from "lucide-react";
import { sessionDetailsType } from "../voice-call/[sessionId]/page";
import HistoryTable from "../_components/HistoryTable";
import { Button } from "@/components/ui/button";
import HistoryList from '@/app/(routes)/dashboard/_components/HistoryList'

const History = () => {
  const [historyList, setHistoryList] = useState<sessionDetailsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/session-chat?sessionId=all");
        setHistoryList(response.data);
      } catch (err) {
        setError("Failed to load history. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <LoaderCircle  className="animate-spin" size={64} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4">
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border-2 border-gray-200 rounded-2xl p-10 max-w-xl mx-auto">
          <Image
            src="/medical-assistance.png"
            height={150}
            width={150}
            alt="No Consultations"
          />
          <h1 className="text-3xl font-semibold">No Recent Consultations</h1>
          <p>You don't have any doctor consultations.</p>
          <Button>Go To Dashboard</Button>
        </div>
      ) : (
        <HistoryTable historyList={historyList} />
      )}
    </div>
  );
};

export default History;
