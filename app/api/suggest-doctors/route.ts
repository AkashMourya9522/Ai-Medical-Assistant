import { openai } from "@/config/openAiModel";
import { AIDoctorAgents } from "@/doctorList/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { note } = await req.json();
  console.log("the user notes in the api is",note)
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "system",
          // content: `You are a helpful medical assistant. Here is a list of available doctors: ${JSON.stringify(AIDoctorAgents)}. Based on the user's notes which is this ${note}, please suggest the most relevant doctors. Your response must be a JSON array containing ONLY the integer IDs of the recommended doctors. For example: [1, 5, 8]`,
          content: `You are an expert medical triage assistant. Your task is to analyze the user's symptoms/notes and find the most relevant doctor from the following list: ${JSON.stringify(AIDoctorAgents)}. You MUST respond with a JSON array containing ONLY the integer IDs of the recommended doctors. For example: [1, 5, 8]`,
        
        },
        {
          role: "user",
          content:note
            // "User notes/symptoms" +
            // note +
            // "depends on user notes and symptoms, please suggest list of doctors . Return the response in JSON format with only the doctor IDs.",
        },
      ],
    });
    // const gptResponse = completion.choices[0].message;
    // const cleanedResponse = gptResponse.content
    //   ?.trim()
    //   .replace("```json", "")
    //   .replace("```", "");
    // const stringVersion = JSON.parse(cleanedResponse);
    // return NextResponse.json(stringVersion);
    const gptResponse = completion.choices[0].message.content;
    console.log("GPT Response in backend file", gptResponse);
    
    // Clean and parse the response
    const cleanedResponse = gptResponse
      ?.trim()
      .replace("```json", "")
      .replace("```", "");
  
    let doctorIds: number[] = [];
    try {
      doctorIds = JSON.parse(cleanedResponse);
    } catch (e) {
      console.log("Failed to parse GPT response:", cleanedResponse);
      return NextResponse.json([]);
    }
  
    // Filter doctors by IDs
    const suggestedDoctors = AIDoctorAgents.filter((doctor) =>
      doctorIds.includes(doctor.id)
    );
  
    console.log("Suggested Doctors based on GPT response", suggestedDoctors);
    return NextResponse.json(suggestedDoctors);
  } catch (error: any) {
    console.log("hello from the api catch error section ", error);
    return NextResponse.json(error);
  }
}
