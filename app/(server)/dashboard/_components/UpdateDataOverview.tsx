"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
    type: any;
    payment: any;
    transaction: any;
    monthHistory: any;
    yearHistory: any
}

export default function UpdateDataOverview({ type, payment, transaction, monthHistory, yearHistory }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            paymentId: '',
            amount: 0,
            description: '',
            date: new Date(),
            type: '',
            category: '',
            categoryIcon: '',
        },
    });

    function extractDateMonth(dateString: string) {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return { day, month, year };
    }

    function extractDateYear(dateString: string) {
        const date = new Date(dateString);

        const month = date.getMonth();
        const year = date.getFullYear();

        return { month, year };
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const filteredTransaction = payment.filter((pay: any) =>
            !transaction.some((tran: any) => tran.paymentId === pay.id)
        );

        const filteredMonthHistory = payment.filter((pay: any) =>
            !monthHistory.some((tran: any) => tran.paymentId === pay.id)
        );

        const filteredYearHistory = payment.filter((pay: any) =>
            !yearHistory.some((tran: any) => tran.paymentId === pay.id)
        );

        setIsLoading(true);
        try {
            if (filteredTransaction.length > 0) {
                const postDataPromises = filteredTransaction.map(async (tran: any) => {
                    const formattedData = {
                        ...data,
                        paymentId: tran.id,
                        amount: tran.totalPrice,
                        description: '',
                        date: tran.endTime,
                        type: 'income',
                        category: '',
                        categoryIcon: ''
                    };

                    return axios.post('/api/transaction', formattedData);
                });

                await Promise.all(postDataPromises);
            }

            if (filteredMonthHistory.length > 0) {
                const postDataPromises = filteredMonthHistory.map(async (tran: any) => {
                    const formattedData = {
                        paymentId: tran.id,
                        ...extractDateMonth(tran.endTime),
                        income: tran.totalPrice,
                        expense: 0
                    };

                    return axios.post('/api/history/month', formattedData);
                });

                await Promise.all(postDataPromises);
            }

            if (filteredYearHistory.length > 0) {
                const postDataPromises = filteredYearHistory.map(async (tran: any) => {
                    const formattedData = {
                        paymentId: tran.id,
                        ...extractDateYear(tran.endTime),
                        income: tran.totalPrice,
                        expense: 0
                    };

                    return axios.post('/api/history/year', formattedData);
                });

                await Promise.all(postDataPromises);
            }

            await Swal.fire({ icon: 'success', title: 'Success', text: 'Data updated successfully!' });
            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            console.error(error);
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update data!' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                Update Data
            </Button>
        </>
    );
}
