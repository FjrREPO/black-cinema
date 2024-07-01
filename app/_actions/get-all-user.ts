import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const getAllUser = async () => {
    const user = prisma.user.findMany({})
    return NextResponse.json(user)
}