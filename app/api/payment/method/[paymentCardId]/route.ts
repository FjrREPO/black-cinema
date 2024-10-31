import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface IParams {
    paymentCardId?: string;
}

async function parseBody(request: Request) {
    try {
        const contentType = request.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            return await request.json();
        }
        throw new Error("Unsupported content type");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return { error: "Invalid request body" };
    }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const { paymentCardId } = params;

    if (!paymentCardId || typeof paymentCardId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedData = await parseBody(request);

        const updatedMovie = await prisma.paymentCard.update({
            where: { id: paymentCardId },
            data: updatedData,
        });

        return NextResponse.json(updatedMovie);
    } catch (error) {
        console.error("Error updating movie:", error);
        return NextResponse.error();
    }
}