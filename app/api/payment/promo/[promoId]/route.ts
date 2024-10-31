import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/_actions/get-user";
import { redirect } from "next/navigation";
import { moviesSchema } from "@/schema/movies";

interface IParams {
    promoId?: string;
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
    const { promoId } = params;

    if (!promoId || typeof promoId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedMovieData = await parseBody(request);

        const updatedMovie = await prisma.paymentPromo.update({
            where: { id: promoId },
            data: updatedMovieData,
        });

        return NextResponse.json(updatedMovie);
    } catch (error) {
        console.error("Error updating movie:", error);
        return NextResponse.error();
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { promoId } = params

    if (!promoId || typeof promoId !== 'string') {
        throw new Error('Invalid ID')
    }

    const movie = await prisma.paymentPromo.deleteMany({
        where: {
            id: promoId
        }
    })

    return NextResponse.json(movie)
}

export async function GET(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const queryParams = moviesSchema.safeParse({
        id
    });

    if (!queryParams.success) {
        return Response.json(queryParams.error.message, { status: 400 });
    }

    const movie = await getMovieById(
        queryParams.data.id
    );

    return Response.json(movie);
}

async function getMovieById(id: string) {
    const movies = await prisma.paymentPromo.findMany({
        where: {
            id: id
        },
    });

    return movies.map((movie) => ({
        ...movie
    }));
}
