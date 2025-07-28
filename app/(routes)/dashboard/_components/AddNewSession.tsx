"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useState } from "react";
import { IconArrowBadgeRight } from "@tabler/icons-react";
import { Protect } from "@clerk/nextjs";

export type DoctorType = {
  specialist: string;
  id: number;
  image: string;
  description: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

function AddNewSession() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestDoctors, setSuggestDoctors] = useState<DoctorType[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const router = useRouter();

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(e.target.value);
  }
  async function handleConsultDoctor(doctor:DoctorType) {
    try {
      setLoading(true);
      const dbRes = await axios.post("/api/session-chat", {
        notes: note,
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

  async function handleSuggestDoctor() {
    try {
      setLoading(true);
      const response = await axios.post("/api/suggest-doctors", {
        note,
      });
      setSuggestDoctors(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        toast.error("You have reached the limit of suggestions for today.");
      } else {
        toast.error("Failed to get doctor suggestions.");
        console.log(error);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Protect
          plan={"pro"}
          fallback={<Button disabled>Try Pro Model</Button>}
        >
          <Button>Consult</Button>
        </Protect>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Details Regarding Your Illness</DialogTitle>
          <DialogDescription asChild>
            {suggestDoctors.length > 0 ? (
              <div className="grid grid-cols-3 grid-rows-4">
                {suggestDoctors.map((doctor: any) => (
                  <div
                    className="hover:border-2 border-blue-400  rounded-xl p-2 flex flex-col items-center justify-around"
                    key={doctor.id}
                  >
                    <h2 className="font-bold mt-2 text-center line-clamp-1 sm:line-clamp-none">
                      {doctor.specialist}
                    </h2>
                    <Button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        handleConsultDoctor(doctor);
                      }}
                      className="mt-3 hover:cursor-pointer mx-auto"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="animate-spin"></Loader2>}
                      Consult <IconArrowBadgeRight />{" "}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 ">
                <Textarea
                  onChange={handleTextArea}
                  className="h-[150px]"
                  placeholder="Enter How Do You Feel Right Now!"
                  disabled={loading}
                />
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {!suggestDoctors.length ? (
            <Button onClick={handleSuggestDoctor} disabled={!note || loading}>
              {loading && <Loader2 className="animate-spin"></Loader2>} Recommed
              A Doctor <ArrowRight />
            </Button>
          ) : (
            ""
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSession;
