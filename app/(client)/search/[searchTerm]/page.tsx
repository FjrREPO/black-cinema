import getCurrentUser from "@/app/_actions/get-user"
import SearchPage from "./_components/SearchPage"

interface IParams {
    searchTerm: string
}

async function page({ params }: { params: IParams }) {
    const user = await getCurrentUser()

    return (
        <div>
            <SearchPage params={params} user={user}/>
        </div>
    )
}

export default page