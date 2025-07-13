import { db } from "@/config/db";
import { openai } from "@/config/openAiModel";
import { usersTable } from "@/config/schema";
import { AIDoctorAgents } from "@/doctorList/list";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Hello from the post request")
    const {notes} = await req.json()
    console.log(notes)
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
            role:"system",
            content:JSON.stringify(AIDoctorAgents)
        },
        {
          role: "user",
          content: "User notes/symptoms"+notes+"depends on user notes and symptoms, please suggest list of doctors . Return object in JSON only",
        },
      ],
    });
    const gptResponse = (completion.choices[0].message);
    return NextResponse.json(gptResponse)
  } catch (error) {
    return NextResponse.json(error)
  }
}
