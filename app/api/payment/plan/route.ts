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
        packageName,
        screenResolution,
        capacity,
        price
    } = body

    const paymentMethod = await prisma.paymentPlan.create({
        data: {
            packageName,
            screenResolution,
            capacity,
            price
        },
    })

    return NextResponse.json(paymentMethod)
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

export type getPaymentPlanType = Awaited<
    ReturnType<typeof getPaymentMethod>
>;

async function getPaymentMethod(packageName: any) {
    const payments = await prisma.paymentPlan.findMany({
        where: {
            packageName: packageName
        }
    });

    return payments.map((pay) => ({
        ...pay
    }));
}