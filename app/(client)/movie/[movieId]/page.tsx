import getMovieById from "@/app/_actions/get-movie-byid";
import { SafeUser, SafeMovie } from "@/types/types"
import { Details } from './_components/Details'

interface IParams {
    movieId?: string
}

const page = async ({ params }: { params: IParams }) => {
    const movie = await getMovieById(params) as SafeMovie & { user: SafeUser };

    if (!movie) {
        return (
            <div>
                <h1>Film tidak ada</h1>
            </div>
        )
    }
    return (
        <Details
            movie={movie}
        />
    )
}

export default page