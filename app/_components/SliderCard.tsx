'use client';

import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './MovieCard';
import { SafeMovie, SafeUser } from '@/types/types';

interface MoviesProps {
    movies: SafeMovie[];
    currentUser?: SafeUser | null;
}

const SliderCard: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const categories = [
        { title: 'Popular Movies', filter: (movie: SafeMovie) => movie.category.includes('Popular Movies') },
        { title: 'Top Movies', filter: (movie: SafeMovie) => movie.category.includes('Top Movies') },
        { title: 'Now Playing', filter: (movie: SafeMovie) => movie.category.includes('Now Playing') },
        { title: 'Upcoming', filter: (movie: SafeMovie) => movie.category.includes('Upcoming') },
    ];

    const renderSwiper = (title: string, filteredMovies: SafeMovie[]) => (
        <div className="ml-5 mr-5">
            <h1 className="mt-[50px] mb-[10px] text-[30px] font-bold">{title}</h1>
            <Swiper
                slidesPerView="auto"
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                navigation
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    },
                }}
            >
                {filteredMovies.map((movie: SafeMovie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} currentUser={currentUser} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );

    return (
        <div>
            {categories.map(({ title, filter }) => renderSwiper(title, movies.filter(filter)))}
        </div>
    );
};

export default SliderCard;
