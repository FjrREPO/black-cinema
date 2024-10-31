import EditPaymentPage from "./EditPaymentPage"

interface IParams {
    paymentId: string
}

export default function page({ params }: { params: IParams }) {
    return (
        <div>
            <EditPaymentPage paymentId={params.paymentId} />
        </div>
    )
}
