import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"
import { getAllPayment } from "@/app/_actions/get-all-payment"
import { getAllUser } from "@/app/_actions/get-all-user"

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
        successPayment,
        expiredPayment,
        room,
    } = body

    const payments = await prisma.payment.create({
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
            successPayment,
            expiredPayment,
            room,
            userId: currentUser.id,
        },
    })

    return NextResponse.json(payments)
}

export async function GET(request: Request) {
    try {
        const payments = await getAllPayment();

        return new Response(JSON.stringify(payments), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export type getPaymentsType = Awaited<
    ReturnType<typeof getPayments>
>;

async function getPayments(userId: any) {
    const payments = await prisma.payment.findMany({
        where: {
            userId: userId
        }
    });

    return payments.map((pay) => ({
        ...pay
    }));
}