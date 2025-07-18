"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, PhoneCall, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface sessionDetailsType {
  id: number;
  sessionId: string;
  notes: string;
  selectedDoctor: {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
    voiceId: string;
    subscriptionRequired: boolean;
  };
  conversation: string;
  report: JSON;
  createdBy: string;
  createdOn: string;
}

function page() {
  const { sessionId } = useParams();

  const [sessionDetails, setSessionDetails] = useState<sessionDetailsType>();

  useEffect(() => {
    sessionId && getSessionDetails();
  }, [sessionId]);

  async function getSessionDetails() {
    const response = await axios.get(
      "/api/session-chat?sessionId=" + sessionId
    );
    console.log(response.data);
    setSessionDetails(response.data);
  }

  return (
    <div className="border-2 rounded-lg p-5 bg-secondary">
      <div className="flex justify-between rounded-lg items-center">
        <h2 className="border-2 rounded-lg flex gap-2 items-center p-3">
          {" "}
          <Circle className="h-4 w-4" /> Not Connected
        </h2>
        <h1 className="text-gray-500 text-2xl font-bold">00:00</h1>
      </div>
      {sessionDetails && (
        <div className="flex flex-col items-center mt-10">
          <Image
            className="h-[100px] w-[100px] object-cover rounded-full"
            src={sessionDetails?.selectedDoctor.image}
            width={120}
            height={120}
            alt="Doctor Image"
          />
          <h1 className="text-xl font-bold mt-5">{sessionDetails.selectedDoctor.specialist}</h1>
          <p className="text-sm text-gray-400">AI Medical Voice Agent </p>

          <div className="flex flex-col items-center mt-32">
            <h1 className="text-gray-400">AI Agent Message</h1>
            <h1 className="text-lg">User Message</h1>
          </div>
          <Button className="mt-20"><PhoneCallIcon/>Start Call</Button>
          
        </div>
      )}
    </div>
  );
}

export default page;
