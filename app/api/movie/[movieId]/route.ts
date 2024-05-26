import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/_actions/get-user";

interface IParams {
    movieId?: string;
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
    const { movieId } = params;

    if (!movieId || typeof movieId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedMovieData = await parseBody(request);

        const updatedMovie = await prisma.movie.update({
            where: { id: movieId },
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

    const { movieId } = params

    if (!movieId || typeof movieId !== 'string') {
        throw new Error('Invalid ID')
    }

    const movie = await prisma.movie.deleteMany({
        where: {
            id: movieId
        }
    })

    return NextResponse.json(movie)
}