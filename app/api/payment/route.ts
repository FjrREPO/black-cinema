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
        movieId,
        userName,
        userEmail,
        startTime,
        endTime,
        feeAdmin,
        price,
        totalPrice,
        packageName,
        methodPayment,
        promoCode,
        status,
        room,
        expiredPayment
    } = body

    const movie = await prisma.payment.create({
        data: {
            movieId,
            userName,
            userEmail,
            startTime,
            endTime,
            feeAdmin,
            price,
            totalPrice,
            packageName,
            methodPayment,
            promoCode,
            status,
            room,
            expiredPayment,
            userId: currentUser.id,
        },
    })

    return NextResponse.json(movie)
}