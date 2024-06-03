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
        prevDataLengthRef.current = filteredData.length;
    }, [filteredData]);

    const shouldAnimateUp = prevDataLengthRef.current > filteredData.length;

    const getLastSegment = useCallback((url: string) => {
        return url.split('/').pop();
    }, []);

    return (
        <div className='h-screen w-full relative'>
            <img
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
                        ? 'linear-gradient(to top, white 1%, transparent)'
                        : 'linear-gradient(to top, black 1%, transparent)',
                    zIndex: 10
                }}
            />
            <div className='flex w-full h-full items-center justify-center z-20 relative'>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <div className='flex flex-col gap-2 text-center text-white'>
                        <Label className='text-4xl font-bold'>Nonton film mudah dan nyaman di Jogja</Label>
                        <Label className='text-xl'>Siap nonton? Telusuri film sekarang!</Label>
                    </div>
                    <div className='flex flex-col w-[350px] relative'>
                        <div className='flex flex-row w-[350px] relative'>
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
                                className='absolute top-1/2 right-0 transform -translate-y-1/2 text-white'
                                onClick={handleSearch}
                                aria-label='Search'
                            >
                                <Search />
                            </Button>
                        </div>
                        {searchQuery && (
                            <motion.div
                                className="w-full h-full absolute top-20 z-10"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <AnimatePresence>
                                    {filteredData.map((mov: any, index: any) => {
                                        const poster = `https://image.tmdb.org/t/p/w92/${getLastSegment(mov.poster_path)}`
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: shouldAnimateUp ? 20 : -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: shouldAnimateUp ? -20 : 20 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <img 
                                                src={poster} 
                                                alt="" />
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
