import EditMethodPaymentPage from "./_components/EditMethodPaymentPage"

interface IParams {
    paymentCardId: string
}

function page({ params }: { params: IParams }) {
    return (
        <div>
            <EditMethodPaymentPage paymentCardId={params.paymentCardId} />
        </div>
    )
}

export default page