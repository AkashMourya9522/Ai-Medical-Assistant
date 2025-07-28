"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AIDoctorAgents } from "@/doctorList/list";
import { useUser } from "@clerk/nextjs";
import { IconArrowBadgeRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { DoctorType } from "./AddNewSession";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function DoctorAgentList() {
  const { user } = useUser();
  const hasPro = user?.publicMetadata?.pro === true;
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  async function handleConsultDoctor(doctor: DoctorType) {
    try {
      setLoading(true);
      const dbRes = await axios.post("/api/session-chat", {
        notes: "New Query",
        selectedDoctor: doctor,
      });
      const sessionId = dbRes.data.sessionId;
      setLoading(false);
      router.push(`/dashboard/voice-call/${sessionId}`);
    } catch (error) {
      setLoading(false);

      toast.error("Could not start the session. Please try again.");
      console.log("Error while adding the data to database", error);
    }
  }

  return (
    <div className="mt-10">
      <h1 className="font-bold text-xl">AI Specialist Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 p-5">
        {AIDoctorAgents.map((doctor) => (
          <div className="relative" key={doctor.id}>
            {doctor.subscriptionRequired && (
              <Badge className="absolute ">Premium</Badge>
            )}
            <Image
              src={doctor.image}
              height={150}
              width={200}
              alt="Doctor"
              className="rounded-lg sm:w-full object-cover h-[250px] w-[250px]"
            />
            <h2 className="font-bold mt-2">{doctor.specialist}</h2>
            <h2 className="text-gray-500 line-clamp-2 mt-2">
              {doctor.description}
            </h2>
            <Button
              disabled={doctor.subscriptionRequired && hasPro || loading}
              className="mt-3 border-2 flex items-center"
              onClick={() => handleConsultDoctor(doctor)}
              variant={'secondary'}
            >
              Consult{" "}
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <IconArrowBadgeRight />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAgentList;
