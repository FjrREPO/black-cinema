import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"
import { getAllUser } from "@/app/_actions/get-all-user";

export async function POST(
    request: Request,
) {
    const body = await request.json()
    const {
        email,
        newPassword,
        confirmPassword
    } = body

    if (newPassword !== confirmPassword) {
        return 
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const allUser = await getAllUser()

    const foundUser = allUser.find((user: any) => user.email === email);

    const newUerPass = await prisma.user.update({
        where: {
            email: foundUser?.email || '',
        },
        data: {
            name: foundUser?.name,
            email: foundUser?.email,
            image: foundUser?.image,
            password: hashedPassword,
            role: foundUser?.role,
            updatedAt: new Date(),
        },
    })

    return NextResponse.json(newUerPass)
}