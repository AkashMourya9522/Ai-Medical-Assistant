import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req:NextRequest){
    //@ts-ignore
    const {notes, selectedDoctor} =  await req.json()   
    const user = await currentUser()

    try {
        const dbRes = await db.insert(SessionChatTable).values({
            sessionId:uuidv4(),
            notes:notes,
            selectedDoctor:selectedDoctor,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdOn:(new Date()).toString()
            //@ts-ignore
        }).returning()
//@ts-ignore
        return NextResponse.json(dbRes[0])
    } catch (error) {
        console.log("Error while saving data into database!!!",error)
        //@ts-ignore
        return NextResponse.json({error})
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const user = await currentUser();
    let result;

    if (sessionId === 'all') {
        result = await db.select()
            .from(SessionChatTable)
            //@ts-ignore
            .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(SessionChatTable.id));

    } else {
        result = await db.select()
            .from(SessionChatTable)
            //@ts-ignore
            .where(eq(SessionChatTable.sessionId, sessionId));
    }
   return NextResponse.json(sessionId === 'all' ? result : result[0]);
}