"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DataTableMovies } from "@/components/tables/movies/DataTableMovies";
import { columnsMovies } from "@/components/tables/movies/columns";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TableMovies({ searchQuery }: { searchQuery: string }) {
    const movies = useQuery<Movie[]>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                `/api/movie`
            ).then((res) => res.json()),
    });

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={movies.isLoading}>
                <DataTableMovies
                    data={movies.data || []}
                    columns={columnsMovies}
                    searchQuery={searchQuery}
                />
            </SkeletonWrapper>
        </div>
    );
}
