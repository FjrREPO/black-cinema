import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { paymentId: string } }
) {
    const body = await request.json();
    const {
        startTime,
        endTime,
        feeAdmin,
        methodPayment,
        promoCode,
        expiredPayment,
        totalPrice,
        price,
        successPayment,
        status,
        room
    } = body;

    const album = await prisma.payment.update({
        where: { id: params.paymentId },
        data: {
            startTime,
            endTime,
            feeAdmin,
            methodPayment,
            promoCode,
            expiredPayment,
            totalPrice,
            price,
            successPayment,
            status,
            room
        },
    });

    return NextResponse.json(album);
}

export async function DELETE(
    request: Request,
    { params }: { params: { paymentId: string } }
) {
    const album = await prisma.payment.delete({
        where: { id: params.paymentId },
    });
    return NextResponse.json(album);
}