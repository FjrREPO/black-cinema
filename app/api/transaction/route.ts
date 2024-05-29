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
        paymentId,
        amount,
        description,
        date,
        type,
        category,
        categoryIcon
    } = body

    const transaction = await prisma.transaction.create({
        data: {
            paymentId,
            amount,
            description,
            date,
            userId: currentUser.id,
            type,
            category,
            categoryIcon
        },
    })

    return NextResponse.json(transaction)
}

export async function GET(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new Response('User not authenticated', { status: 401 });
        }

        const allUsers = await getAllUser();

        const filteredUser = allUsers.find(user => user.id === currentUser.id);
        if (!filteredUser) {
            return new Response('User not found', { status: 404 });
        }

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