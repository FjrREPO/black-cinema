'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Homepage({ movies }: { movies: any }) {
    const router = useRouter();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const prevDataLengthRef = useRef<number>(0);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Pencarian kosong!',
            });
            return;
        }
        router.push(`/search/${searchQuery}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const filtered = movies.data.filter((mov: any) =>
                mov.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(movies.data);
        }
    }, [searchQuery, movies.data]);

    useEffect(() => {
        prevDataLengthRef.current = filteredData?.length;
    }, [filteredData]);

    const shouldAnimateUp = prevDataLengthRef.current > filteredData?.length;

    const getLastSegment = useCallback((url: string) => {
        return url.split('/').pop();
    }, []);

    const handleClickMovie = (movie: any) => {
        router.push(`/movie/${movie}`);
    };

    const backgroundHeight = filteredData?.slice(0, 3).length * 80;

    return (
        <div className='h-screen w-full relative'>
            <Image width={100} height={100}
                src="https://res.cloudinary.com/dutlw7bko/image/upload/v1717413141/Cinema/background_homes_wisn4x.jpg"
                alt="bg"
                className='w-full h-full object-cover object-center absolute z-0'
                loading='lazy'
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    background: theme === 'light'
                        ? 'linear-gradient(to top, #fbfbfb, transparent)'
                        : 'linear-gradient(to top, black, transparent)',
                    zIndex: 10
                }}
            />
            <div className='flex w-full h-full items-center justify-center z-20 relative'>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <div className='flex flex-col gap-2 text-center text-white px-5'>
                        <Label className='text-4xl font-bold'>Nonton film mudah dan nyaman di Jogja</Label>
                        <Label className='text-xl'>Siap nonton? Telusuri film sekarang!</Label>
                    </div>
                    <div className='flex flex-col w-[350px] relative'>
                        <div className='flex flex-row w-[350px] relative px-5'>
                            <Input
                                type={'text'}
                                className='w-full py-7 focus-visible:ring-white'
                                placeholder='Search by title'
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label='Search by title'
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                variant={'link'}
                                className='absolute top-1/2 right-5 transform -translate-y-1/2 text-white'
                                onClick={handleSearch}
                                aria-label='Search'
                            >
                                <Search />
                            </Button>
                        </div>
                        {searchQuery && filteredData.length > 0 && (
                            <motion.div
                                className={`absolute top-[60px] z-10 w-full h-fit`}
                                initial={{ opacity: 0, height: shouldAnimateUp ? 0 : backgroundHeight }}
                                animate={{ opacity: 1, height: backgroundHeight }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className='flex w-full h-full p-5 rounded-lg bg-gray-700/60'>
                                    <div className='flex flex-col gap-2 w-full h-full'>
                                        <AnimatePresence>
                                            {filteredData.slice(0, 3).map((mov: any, index: any) => {
                                                const poster = `https://image.tmdb.org/t/p/w92/${getLastSegment(mov.poster_path)}`
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: shouldAnimateUp ? 20 : -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: shouldAnimateUp ? -20 : 20 }}
                                                        transition={{ duration: 0.7 }}
                                                        className='flex flex-col w-full h-full gap-1'
                                                        onClick={() => handleClickMovie(mov.id)}
                                                    >
                                                        <div className='flex flex-row gap-2 w-full h-full cursor-pointer'>
                                                            <Image width={100} height={100}
                                                                src={poster}
                                                                alt={mov.title}
                                                                className='w-10 rounded-lg'
                                                            />
                                                            <div className='flex flex-col w-full gap-2'>
                                                                <Label className='flex w-fit h-fit line-clamp-1'>{mov.title}</Label>
                                                                <div className='flex flex-row h-fit w-full gap-2 items-center'>
                                                                    <StarCalc voteAverage={mov.vote_average} />
                                                                    <Label>{(mov.vote_average / 2).toFixed(2)}</Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < filteredData.slice(0, 3).length - 1 && (
                                                            <div className="border-b border-gray-600 w-full"></div>
                                                        )}
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const StarCalc = ({ voteAverage }: any) => {
    const fullStars = Math.floor(voteAverage / 2);
    const hasHalfStar = voteAverage / 2 - fullStars >= 0.1;

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} className='text-yellow-500 fill-yellow-500 w-5 h-5' />
            ))}
            {hasHalfStar && (
                <FaStarHalfAlt className='text-yellow-500 fill-yellow-500 w-5 h-5' />
            )}
        </div>
    );
};

export default Homepage;
