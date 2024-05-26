"use client";

import { getTransactionHistoryType } from "@/app/api/transactions-history/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/DataTable";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TableMovies() {
    const movies = useQuery<getTransactionHistoryType>({
        queryKey: ["transactions", "history"],
        queryFn: () =>
            fetch(
                `/api/movies`
            ).then((res) => res.json()),
    });

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={movies.isLoading}>
                <DataTable
                    data={movies.data || []}
                    columns={columns}
                />
            </SkeletonWrapper>
        </div>
    );
}
