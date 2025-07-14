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
import { IconArrowBadgeRight } from "@tabler/icons-react";
import axios from "axios";
import { ArrowRight, Loader, Loader2 } from "lucide-react";

import React, { useState } from "react";

function AddNewSession() {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestDoctors, setSuggestDoctors] = useState([]);

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(e.target.value);
  }
  console.log(suggestDoctors);

  async function handleUserReq() {
    try {
      setLoading(true);
      const response = await axios.post("/api/suggest-doctors", { note });
      console.log(response.data);
      setSuggestDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "There seems to be an error while sending the request to /api/suggest-doctors",
        error
      );
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Consult Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Details Regarding Your Illness</DialogTitle>
          <DialogDescription asChild>
            {suggestDoctors.length > 0 ? (<div className="grid grid-cols-1">
              
              {suggestDoctors.map((doctor) => (
                <div key={doctor.id}>
                  <h2 className="font-bold mt-2">{doctor.specialist}</h2>
                  <h2 className="text-gray-500 line-clamp-2 mt-2">
                    {doctor.reason}
                  </h2>
                  <Button className="mt-3">
                    Consult <IconArrowBadgeRight />{" "}
                  </Button>
                </div>
              ))}
            </div>) : (
              <div className="mt-5 ">
                <Textarea
                  onChange={handleTextArea}
                  className="h-[150px]"
                  placeholder="Enter How Do You Feel Right Now!"
                />
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          
          <Button onClick={handleUserReq} disabled={!note || loading}>
            
            {loading && <Loader2 className="animate-spin"></Loader2> } Recommed A Doctor <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSession;
