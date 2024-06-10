import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/app/_actions/get-user"
import { getAllPaymentPlan } from "@/app/_actions/get-all-payment-plan"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        promoCode,
        priceDisc,
        usable,
        expired
    } = body

    const paymentPromo = await prisma.paymentPromo.create({
        data: {
            promoCode,
            priceDisc,
            usable,
            expired
        },
    })

    return NextResponse.json(paymentPromo)
}

export async function GET(request: Request) {
    try {
        const payments = await getAllPaymentPlan();

        return new Response(JSON.stringify(payments), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export type getPaymentPromoType = Awaited<
    ReturnType<typeof getPaymentMethod>
>;

async function getPaymentMethod(promoCode: any) {
    const payments = await prisma.paymentPromo.findMany({
        where: {
            promoCode: promoCode
        }
    });

    return payments.map((pay) => ({
        ...pay
    }));
}