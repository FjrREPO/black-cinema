'use client'

import { SafeUser, SafeMovie } from "@/types/types"

interface MovieClientProps {
    movie: SafeMovie & {
        user: SafeUser
    }
}

export const Details: React.FC<MovieClientProps> = ({
    movie,
}) => {

    return (
        <>
            <div
                className="w-full bg-cover min-h-[100vh]"
                style={{
                    backgroundImage: `url(${movie.backdrop_path})`
                }}
            >
                <div className='bg-black/50 min-h-[100vh]'>
                    <div
                        className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="rounded-lg w-[50vw] md:w-[25vw] self-center"
                            style={{ height: '100%' }}
                            alt=""
                            loading="lazy"
                        />
                        <div className="p-2 h-fit rounded-[20px]"
                        >
                            <h2 className="text-[50px] mb-3 font-bold text-center">
                                {movie.title}
                            </h2>
                            <p className="text-md mb-3">{movie.overview}</p>
                            <p className="mb-3">
                                <span className="font-semibold mr-1">Kategori :</span>
                                {movie.category.map((category: string, catIndex: number) => (
                                    <>
                                        {category}
                                        {catIndex !== movie.category.length - 1 && movie.category.length > 1 && ', '}
                                    </>
                                ))}
                            </p>
                            <p className="mb-3">
                                <span className="font-semibold mr-1">Tanggal rilis :</span>
                                {movie.release_date.toString()}
                            </p>
                            <div className='flex flex-col gap-3'>
                                <span className='font-bold'>Genre:</span>
                                <div className='grid grid-cols-3 sm:flex flex-row gap-3'>
                                    {movie.genres?.map((genre: any) => (
                                        <p className='px-5 py-2 bg-white text-black rounded-[20px] font-bold text-center items-center flex justify-center'>{genre}</p>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:gap-5 justify-center items-center'>
                                <div className="trailer">
                                    <a href={movie.trailer} target='_blank'>
                                        <button className='movie__btnTrailer mt-10 px-20 py-5 bg-[#13a4e8] rounded-[20px] font-bold'>
                                            Watch Trailer
                                        </button>
                                    </a>
                                </div>
                                <a href={`/movie/${movie.id}/order`}>
                                    <button className='movie__btn mt-10 px-20 py-5 bg-[#e6bc17] rounded-[20px] font-bold'>
                                        Order Ticket
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}