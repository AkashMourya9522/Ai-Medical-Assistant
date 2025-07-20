"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, Loader, PhoneCallIcon, PhoneOffIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import provider from "@/app/provider";

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

type messagesType = {
  role: string;
  text: string;
};

function page() {
  const { sessionId } = useParams();

  const [sessionDetails, setSessionDetails] = useState<sessionDetailsType>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messagesType[]>([]);

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

  function startCall() {
    console.log("Starting call with session details:", sessionDetails);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || "");
    console.log("new vapi object i guess ",vapi);

    setVapiInstance(vapi);
    const vapiAgentConfig = {
      name: "AI Medical Doctor Assistant",
      firstMessage:
        "Hi there! Iam your AI medical assistant. How may i help you?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetails?.selectedDoctor.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetails?.selectedDoctor.agentPrompt,
          },
        ],
      },
    };
    console.log("Starting the vapi");
    //@ts-ignore
    vapi.start(vapiAgentConfig);

    console.log("vapi has started",vapi)

    vapi.on("call-start", () => {
      setCallStarted(true);
      console.log("Call started");
    });
    vapi.on("call-end", () => {
      setCallStarted(false);
      console.log("Call ended");
    });
    vapi.on("message", (message) => {
      console.log("the message object", message);
      console.log("the role is ", message.role);
      console.log("the type is ", message.transcriptType);

      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;

        console.log(`${message.role}: ${message.transcript}`);

        if (transcriptType == "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType == "final") {
          console.log("from transcript final:", message);
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });
    vapi.on("speech-start", () => {
      setCurrentRole("assistant");
      console.log("Assistant started speaking");
    });
    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRole("user");
    });
  }

  function endCall() {
    if (!vapiInstance) return;
    vapiInstance.stop();
    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");
    setCallStarted(false);
    setVapiInstance(null);
  }

  return (
    <div className="border-2 rounded-lg p-5 bg-secondary">
      <div className="flex justify-between rounded-lg items-center">
        <h2 className="border-2 rounded-lg flex gap-2 items-center p-3">
          {" "}
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />{" "}
          {callStarted ? "Connected" : "Not Connected"}
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
          <h1 className="text-xl font-bold mt-5">
            {sessionDetails.selectedDoctor.specialist}
          </h1>
          <p className="text-sm text-gray-400">AI Medical Voice Agent </p>

          <div className="flex flex-col items-center mt-32">
            <h1 className="text-gray-400">AI Agent Message</h1>
          </div>
          <div className="mt-5 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages.slice(-4).map((msg: messagesType, index) => (
              <h1 className="text-gray-500" key={index}>
                <span className="font-semibold capitalize">{msg.role}</span> :{" "}
                {msg.text}
              </h1>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && (
              <h1 className="text-lg">
                {currentRole}:{liveTranscript}
              </h1>
            )}
          </div>
          {!callStarted ? (
            <Button onClick={startCall} className="mt-20">
                <PhoneCallIcon />
              Start Call
            </Button>
          ) : (
            <Button onClick={endCall} variant={"destructive"} className="mt-20">
              <PhoneOffIcon />
              End Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default page;
