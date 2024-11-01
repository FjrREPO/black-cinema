"use server"

import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function DeletePaymentPromo(id: string) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    const movie = await prisma.paymentPromo.deleteMany({
        where: {
            id: id
        }
    })

    if (!movie) {
        throw new Error("Film tidak ditemukan");
    }
}
