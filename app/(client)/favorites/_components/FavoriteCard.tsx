import FavoriteButton from "@/app/_components/FavoriteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image";

interface FavoriteProps {
    movie: any
    user: any
}

function getLastUrl(url: string) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

function FavoriteCard({ movie, user }: FavoriteProps) {
    const backdrop = getLastUrl(movie.poster_path)
    return (
        <div className="w-full h-full">
            <Card className="p-5 dark:border-white min-w-fit">
                <CardContent className="flex flex-row gap-3 w-full p-0">
                    <Image src={`https://image.tmdb.org/t/p/w154/${backdrop}`} loading="lazy" alt={movie.title} className="rounded-lg max-w-[150px] h-fit" width={100} height={100} />
                    <CardContent className="flex flex-col p-0 pl-5 h-auto justify-center gap-5">
                        <CardTitle>{movie.title}</CardTitle>
                        <CardDescription className="line-clamp-5 h-fit">{movie.overview}</CardDescription>
                        <CardContent className="flex flex-row w-full justify-between p-0">
                            <Button className="flex w-fit h-fit" variant={'outline'} onClick={() => window.location.href = (`/movie/${movie.id}`)}>See Detail</Button>
                            <FavoriteButton movieId={movie.id} currentUser={user} classNameCustom=""/>
                        </CardContent>
                    </CardContent>
                </CardContent>
            </Card>
        </div>
    )
}

export default FavoriteCard