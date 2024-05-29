import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }
    
}