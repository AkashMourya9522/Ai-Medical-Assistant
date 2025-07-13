import { Button } from "@/components/ui/button";
import { AIDoctorAgents } from "@/doctorList/list";
import { IconArrowBadgeRight, IconArrowRightBar, IconArrowRightFromArc } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

function DoctorAgentList() {
    
  return (
    <div className="mt-10">
      <h1 className="font-bold text-xl">AI Specialist Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 p-5">
        {AIDoctorAgents.map((doctor) => (
          <div
            key={doctor.id}
          >
            <Image src={doctor.image} height={150} width={200} alt="Doctor" className="rounded-lg w-full object-cover h-[250px]" />
            <h2 className="font-bold mt-2">{doctor.specialist}</h2>
            <h2 className="text-gray-500 line-clamp-2 mt-2">{doctor.description}</h2>
            <Button className="mt-3">Consult <IconArrowBadgeRight/> </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAgentList;
