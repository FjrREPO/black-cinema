'use client'

import { Payment } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import EditPayment from "./EditPayment"
import SkeletonWrapper from "@/components/SkeletonWrapper"
import { Button } from "@/components/ui/button"

export default function EditPaymentPage({ paymentId }: { paymentId: string }) {
    const payments = useQuery<Payment[]>({
        queryKey: ["payment"],
        queryFn: () =>
            fetch(
                `/api/payment/${paymentId}`
            ).then((res) => res.json()),
    })

    const payment = payments.data?.find((payment: any) => payment.id == paymentId)

    return (
        <SkeletonWrapper isLoading={payments.isLoading}>
            <EditPayment payment={payment!} trigger={<Button>Open</Button>}/>
        </SkeletonWrapper>
    )
}
