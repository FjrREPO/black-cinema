"use client"

import React from 'react'
import EditPromo from './EditPromo'
import { useQuery } from '@tanstack/react-query';
import { PaymentPromo } from '@prisma/client';
import SkeletonWrapper from '@/components/SkeletonWrapper';

function EditMoviePage({ promoId }: { promoId: string }) {
    const movies = useQuery<PaymentPromo[]>({
        queryKey: ["paymentPromo"],
        queryFn: () =>
            fetch(
                `/api/payment/promo`
            ).then((res) => res.json()),
    });

    const paymentPromo = movies.data?.find((paymentPromo: any) => paymentPromo.id == promoId)
    
    return (
        <SkeletonWrapper isLoading={movies.isLoading}>
            <EditPromo promoId={promoId} paymentPromo={paymentPromo}/>
        </SkeletonWrapper>
    )
}

export default EditMoviePage