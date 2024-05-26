import prisma from "@/lib/prisma";
import { moviesSchema } from "@/schema/movies";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId");

    const queryParams = moviesSchema.safeParse({
        movieId,
    });

    if (!queryParams.success) {
        return Response.json(queryParams.error.message, { status: 400 });
    }

    const movies = await getMovies(
        user.id
    );

    return Response.json(movies);
}

export type getMoviesType = Awaited<
    ReturnType<typeof getMovies>
>;

async function getMovies(userId: string) {

    const movies = await prisma.movie.findMany({
        where: {
            id: userId
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return movies.map((movie) => ({
        ...movie
    }));
}
