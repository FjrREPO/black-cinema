"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DataTablePaymentPromo } from "@/components/tables/payment/promo/DataTablePayment";
import { columnsPaymentsPromo } from "@/components/tables/payment/promo/columns";
import { PaymentPromo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PaymentPromoPage() {
    const paymentPromo = useQuery<PaymentPromo[]>({
        queryKey: ["paymentPromo"],
        queryFn: () =>
            fetch(
                `/api/payment/promo`
            ).then((res) => res.json()),
    });

    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={paymentPromo.isLoading}>
                <DataTablePaymentPromo
                    data={paymentPromo.data || []}
                    columns={columnsPaymentsPromo}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </SkeletonWrapper>
        </div>
    );
}
