import prisma from "@/lib/prisma"

export async function GET(
    request: Request,
) {
    try {
        const user = await prisma.user.findMany()

        return Response.json(user);
    } catch (error) {
        throw error
    }
}