'use client'

import Carakerja from './Carakerja'
import { useQuery } from '@tanstack/react-query'
import { PaymentCard } from '@prisma/client'

export default function CarakerjaPage({ nameCard }: { nameCard: string }) {
    const paymentMethod = useQuery<PaymentCard[]>({
        queryKey: ["method"],
        queryFn: () =>
            fetch(
                `/api/payment/method`
            ).then((res) => res.json()),
    });

    return (
        <Carakerja paymentMethod={paymentMethod.data || []} isLoading={paymentMethod.isLoading} nameCard={nameCard}/>
    )
}