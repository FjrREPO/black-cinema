"use client"

import React from 'react'
import EditMovie from './EditMovie'
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@prisma/client';
import SkeletonWrapper from '@/components/SkeletonWrapper';

function EditMoviePage({ movieId }: { movieId: string }) {
    const movies = useQuery<Movie[]>({
        queryKey: ["movies"],
        queryFn: () =>
            fetch(
                `/api/movie`
            ).then((res) => res.json()),
    });

    const movie = movies.data?.find((movie: any) => movie.id == movieId)
    
    return (
        <SkeletonWrapper isLoading={movies.isLoading}>
            <EditMovie movieId={movieId} movie={movie}/>
        </SkeletonWrapper>
    )
}

export default EditMoviePage