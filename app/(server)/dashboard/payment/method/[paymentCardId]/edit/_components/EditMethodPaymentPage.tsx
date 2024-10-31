"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Movie, PaymentCard } from '@prisma/client';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import EditMethodPayment from './EditMethodPayment';

function EditMethodPaymentPage({ paymentCardId }: { paymentCardId: string }) {
    const methods = useQuery<PaymentCard[]>({
        queryKey: ["paymentCard"],
        queryFn: () =>
            fetch(
                `/api/payment/method`
            ).then((res) => res.json()),
    });

    const method = methods.data?.find((method: any) => method.id == paymentCardId)
    
    return (
        <SkeletonWrapper isLoading={methods.isLoading}>
            <EditMethodPayment method={method}/>
        </SkeletonWrapper>
    )
}

export default EditMethodPaymentPage