import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        paymentId,
        day,
        month,
        year,
        income,
        expense
    } = body

    const movie = await prisma.monthHistory.create({
        data: {
            paymentId,
            day,
            month,
            year,
            userId: currentUser.id,
            income,
            expense
        },
    })

    return NextResponse.json(movie)
}