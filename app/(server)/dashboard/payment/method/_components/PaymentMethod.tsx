"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DataTablePaymentMethod } from "@/components/tables/payment/method/DataTablePaymentMethod";
import { columnsPaymentsMethod } from "@/components/tables/payment/method/columns";
import { PaymentCard } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PaymentMethod() {
    const paymentMethod = useQuery<PaymentCard[]>({
        queryKey: ["method"],
        queryFn: () =>
            fetch(
                `/api/payment/method`
            ).then((res) => res.json()),
    });

    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={paymentMethod.isLoading}>
                <DataTablePaymentMethod
                    data={paymentMethod.data || []}
                    columns={columnsPaymentsMethod}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </SkeletonWrapper>
        </div>
    );
}
