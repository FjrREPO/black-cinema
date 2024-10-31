'use client'

import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import ImageUpload from '@/components/inputs/imageUpload';
import { categories, genres } from '../../../add/_components/data';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MovieProps {
    movieId: string
    movie: any
}

function EditMovie({ movieId, movie }: MovieProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>(movie?.category?.map((cat: any) => ({ value: cat, label: cat })) ?? []);
    const [selectedGenres, setSelectedGenres] = useState<any[]>(movie?.genres?.map((genre: any) => ({ value: genre, label: genre })) ?? []);

    const [movieName, setMovieName] = useState(movie?.title);
    const [movieOverview, setMovieOverview] = useState(movie?.overview);
    const [moviePosterPath, setMoviePosterPath] = useState(movie?.poster_path);
    const [movieBackdropPath, setMovieBackdropPath] = useState(movie?.backdrop_path);
    const [movieReleaseDate, setMovieReleaseDate] = useState(movie?.release_date);
    let [trailerPath, setTrailerPath] = useState(movie?.trailer);
    const [movieDuration, setMovieDuration] = useState(movie?.movieDuration)
    const [voteAverage, setVoteAverage] = useState(movie?.vote_average)

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieName(e.target.value);
    };

    const handleChangeOverview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMovieOverview(e.target.value);
    };

    const handleChangeReleaseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieReleaseDate(e.target.value);
    };

    const handleChangeTrailer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrailerPath(e.target.value);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: movie?.title,
            overview: movie?.overview,
            poster_path: movie?.poster_path,
            backdrop_path: movie?.backdrop_path,
            genres: movie?.genres?.map((genre: any) => ({ value: genre, label: genre })) ?? [],
            category: movie?.category?.map((cat: any) => ({ value: cat, label: cat })) ?? [],
            release_date: movie?.release_date,
            trailer: movie?.trailer
        },
    });

    useEffect(() => {
        setMoviePosterPath(movie?.poster_path)
        setMovieBackdropPath(movie?.backdrop_path)
    }, []);


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const formattedData = {
                ...data,
                title: movieName,
                overview: movieOverview,
                poster_path: moviePosterPath,
                backdrop_path: movieBackdropPath,
                release_date: movieReleaseDate,
                movieDuration: movieDuration,
                vote_average: voteAverage,
                genres: selectedGenres.map((genre) => genre.label),
                category: selectedCategories.map((category) => category.label),
                trailer: trailerPath
            };
            await axios.post('/api/movie', formattedData);
            await Swal.fire({ icon: 'success', title: 'Success', text: 'Movie added successfully!' });
            router.push('/dashboard/movies');
            router.refresh();
            reset();
        } catch (error) {
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed add movie!' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeGenres = (selectedGenre: any) => {
        setSelectedGenres(selectedGenre);
    };

    const handleChangeCategories = (selectedCategory: any) => {
        setSelectedCategories(selectedCategory);
    };

    const handleChangeDuration = (e: any) => {
        setMovieDuration(e.target.value);
    };

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-[90vw] lg:w-[80vw] flex-col items-center'>
                <Label className="flex justify-center text-[35px] pt-5 mb-10">Edit Data</Label>
                <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10">
                    <div className="flex flex-col justify-center items-center gap-3 h-fit min-w-[30vw]">
                        <div className="flex flex-col w-full gap-3">
                            <Input type="text" placeholder="masukkan judul" value={movieName} onChange={handleChangeTitle} required />
                        </div>
                        <div className="flex flex-col w-full gap-3 h-fit">
                            <Label>Pilih Genre:</Label>
                            <Select>
                                <SelectTrigger>
                                    <Input
                                        type="text"
                                        value={selectedGenres?.map((genre) => genre.label).join(', ')}
                                        placeholder="Select genres..."
                                        readOnly
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {genres.map((genre) => (
                                        <SelectGroup
                                            key={genre.id}
                                            onClick={() => {
                                                const genreExists = selectedGenres.some((cat) => cat.value === genre.id);
                                                if (!genreExists) {
                                                    handleChangeGenres([...selectedGenres, { value: genre.id, label: genre.name }]);
                                                } else {
                                                    handleChangeGenres(selectedGenres.filter((cat) => cat.value !== genre.id));
                                                }
                                            }}
                                        >
                                            {genre.name}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <Label>Deskripsi:</Label>
                            <Textarea {...register('overview')} placeholder="deskripsi..." value={movieOverview} onChange={handleChangeOverview} />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Pilih Kategori:</Label>
                            <Select>
                                <SelectTrigger>
                                    <Input
                                        type="text"
                                        value={selectedCategories.map((category) => category.label).join(', ')}
                                        placeholder="Select categories..."
                                        readOnly
                                        required
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectGroup
                                            key={category.id}
                                            onClick={() => {
                                                const categoryExists = selectedCategories.some((cat) => cat.value === category.id);
                                                if (!categoryExists) {
                                                    handleChangeCategories([...selectedCategories, { value: category.id, label: category.name }]);
                                                } else {
                                                    handleChangeCategories(selectedCategories.filter((cat) => cat.value !== category.id));
                                                }
                                            }}
                                        >
                                            {category.name}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Pilih Tanggal Rilis:</Label>
                            <Input {...register('release_date')} type="date" onChange={handleChangeReleaseDate} value={movieReleaseDate} placeholder="pilih tanggal..." />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Durasi:</Label>
                            <Input {...register('movieDuration')} type="text" onChange={handleChangeDuration} value={movieDuration} placeholder="input durasi (dalam menit)" />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Link:</Label>
                            <Input {...register('trailer')} type="text" onChange={handleChangeTrailer} placeholder="https://" value={trailerPath} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 items-center'>
                        <div className="flex flex-col w-fit gap-3 h-fit">
                            <Label>Pilih Poster:</Label>
                            <ImageUpload
                                value={moviePosterPath || ''}
                                onChange={(value) => {
                                    setMoviePosterPath(value);
                                    setCustomValue('poster_path', value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col w-fit gap-3 h-fit">
                            <Label>Pilih Backdrop:</Label>
                            <ImageUpload
                                value={movieBackdropPath || ''}
                                onChange={(value) => {
                                    setMovieBackdropPath(value);
                                    setCustomValue('backdrop_path', value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit" variant={'secondary'} className='mt-10'>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default EditMovie;