import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOption)
    if (!session)
        return NextResponse.json({}, { status: 401 })
    const body = await req.json()
    const validation = issueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(newIssue, { status: 201 })

}