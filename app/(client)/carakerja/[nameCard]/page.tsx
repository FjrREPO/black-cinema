import { getAllPayment } from "@/app/_actions/get-all-payment"
import getCurrentUser from "@/app/_actions/get-user"
import CarakerjaPage from "./_components/CarakerjaPage"
import Navbar from "@/components/Navbar"

interface IParams {
    nameCard: string
}

async function page({ params }: { params: IParams }) {
    const user = await getCurrentUser()
    const payment = await getAllPayment()

    return (
        <div>
            <Navbar user={user} payment={payment} />
            <CarakerjaPage nameCard={params.nameCard} />
        </div>
    )
}

export default page