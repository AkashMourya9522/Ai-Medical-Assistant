import { openai } from "@/config/openAiModel";
import { AIDoctorAgents } from "@/doctorList/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "system",
          content: JSON.stringify(AIDoctorAgents),
        },
        {
          role: "user",
          content:
            "User notes/symptoms" +
            notes +
            "depends on user notes and symptoms, please suggest list of doctors . Return object in JSON only",
        },
      ],
    });
    const gptResponse = completion.choices[0].message;
    const cleanedResponse = gptResponse.content
      ?.trim()
      .replace("```json", "")
      .replace("```", "");
    console.log(
      "this is from the route and the data before stringifying the cleaned response is",
      cleanedResponse
    );
    const stringVersion = JSON.parse(cleanedResponse);
    console.log(
      "this is from the route and the data before stringifying the after conversion",
      stringVersion
    );
    return NextResponse.json(stringVersion);
  } catch (error: any) {
    console.log("hello from the api catch error section ", error);
    return NextResponse.json(error);
  }
}
