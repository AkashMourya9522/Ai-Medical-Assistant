import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const user = await currentUser()
    try {
        const dbRes = await db.select().from(usersTable)
        //@ts-ignore
        .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress) )
        if(dbRes.length == 0){
            const response = await db.insert(usersTable).values({
                //@ts-ignore
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                credits: 10,
                //@ts-ignore
            }).returning({usersTable})
            return NextResponse.json(response[0]?.usersTable);
        }
        return NextResponse.json(dbRes[0]);
    } catch (error) {
        console.log("error in creating user ", error);
    }
}