"use client"
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
import { ArrowRight } from "lucide-react";

import React, { useState } from "react";

function AddNewSession() {
    const[note,setNote] = useState<string>()
    function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setNote(e.target.value)
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
            <div className="mt-5 ">
              <Textarea
              onChange={handleTextArea}
                className="h-[150px]"
                placeholder="Enter How Do You Feel Right Now!"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button disabled={!note}>
            Recommed A Doctor <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSession;
