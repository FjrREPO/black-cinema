import React from 'react';
import FavoriteButton from '@/app/_components/FavoriteButton';
import { SafeMovie, SafeUser } from '@/types/types';

interface MovieCardProps {
    movie: SafeMovie;
    currentUser?: SafeUser | null;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, currentUser }) => {
    const classNameCustom = 'absolute w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] top-0 left-2 rounded-br-[20px] rounded-tl-lg cursor-pointer bg-black p-3';

    return (
        <div className="px-2 relative scale-95 hover:scale-100 transform transition-transform duration-300 ease-in-out">
            <a href={`/movie/${movie.id}`} className="block relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-full rounded-lg"
                    loading="lazy"
                    alt={`Poster for ${movie.title}`}
                    fetchPriority="low"
                />
            </a>
            <FavoriteButton movieId={movie.id} currentUser={currentUser} classNameCustom={classNameCustom} />
        </div>
    );
};

export default MovieCard;
