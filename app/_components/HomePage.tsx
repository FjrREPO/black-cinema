'use client'

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { SafeUser } from "@/types/types";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Banner from "./Banner";

function HomePage({ currentUser }: { currentUser: SafeUser | null }) {
    const movies = useQuery<Movie[]>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                `/api/movie`
            ).then((res) => res.json()),
    });
    return (
        <div>
            <SkeletonWrapper isLoading={movies.isLoading}>
                <Banner
                    movies={movies.data || []}
                    currentUser={currentUser}
                />
            </SkeletonWrapper>
        </div>
    )
}

export default HomePage