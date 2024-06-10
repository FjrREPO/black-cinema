import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"
import { getAllPaymentCard } from "@/app/_actions/get-all-payment-card"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        numberCard,
        nameCard,
        imageCard,
        imageQR,
        categoryInstitue
    } = body

    const paymentMethod = await prisma.paymentCard.create({
        data: {
            numberCard,
            nameCard,
            imageCard,
            imageQR,
            categoryInstitue
        },
    })

    return NextResponse.json(paymentMethod)
}

export async function GET(request: Request) {
    try {
        const payments = await getAllPaymentCard();

        return new Response(JSON.stringify(payments), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export type getPaymentMethodType = Awaited<
    ReturnType<typeof getPaymentMethod>
>;

async function getPaymentMethod(nameCard: any) {
    const payments = await prisma.paymentCard.findMany({
        where: {
            nameCard: nameCard
        }
    });

    return payments.map((pay) => ({
        ...pay
    }));
}