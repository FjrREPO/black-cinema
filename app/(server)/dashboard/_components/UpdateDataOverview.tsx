"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

interface Props {
    payment: any;
    transaction: any;
    monthHistory: any;
    yearHistory: any
}

export default function UpdateDataOverview({ payment, transaction, monthHistory, yearHistory }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, formState: { errors } } = useForm<FieldValues>();

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

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        const filteredTransaction = payment.filter((pay: any) =>
            !transaction.some((tran: any) => tran.paymentId === pay.id)
        );

        const filteredMonthHistory = payment.filter((pay: any) =>
            !monthHistory.some((tran: any) => tran.paymentId === pay.id)
        );

        const filteredYearHistory = payment.filter((pay: any) =>
            !yearHistory.some((tran: any) => tran.paymentId === pay.id)
        );

        const validationStatusTransaction = filteredTransaction.find((tran: any) => tran.status === 'success');
        const validationStatusMonth = filteredMonthHistory.find((tran: any) => tran.status === 'success');
        const validationStatusYear = filteredYearHistory.find((tran: any) => tran.status === 'success');
        
        setIsLoading(true);
        try {
            let dataUpdatedTransaction = false;
            let dataUpdatedMonth = false;
            let dataUpdatedYear = false;
        
            if (filteredTransaction.length > 0 && validationStatusTransaction) {
                const postDataPromises = filteredTransaction.map(async (tran: any) => {
                    const formattedData = {
                        paymentId: tran.id,
                        amount: tran.totalPrice,
                        description: 'Pemesanan Tiket',
                        date: tran.successPayment,
                        type: 'income',
                    };
        
                    return axios.post('/api/transaction', formattedData);
                });
        
                await Promise.all(postDataPromises);
                dataUpdatedTransaction = true;
            }
        
            if (filteredMonthHistory.length > 0 && validationStatusMonth) {
                const postDataPromises = filteredMonthHistory.map(async (tran: any) => {
                    const formattedData = {
                        paymentId: tran.id,
                        ...extractDateMonth(tran.successPayment),
                        income: tran.totalPrice,
                        expense: 0
                    };

                    console.log('dat ==', formattedData)
        
                    return axios.post('/api/history/month', formattedData);
                });
        
                await Promise.all(postDataPromises);
                dataUpdatedMonth = true;
            }
        
            if (filteredYearHistory.length > 0 && validationStatusYear) {
                const postDataPromises = filteredYearHistory.map(async (tran: any) => {
                    const formattedData = {
                        paymentId: tran.id,
                        ...extractDateYear(tran.successPayment),
                        income: tran.totalPrice,
                        expense: 0
                    };
        
                    return axios.post('/api/history/year', formattedData);
                });
        
                await Promise.all(postDataPromises);
                dataUpdatedYear = true;
            }
        
            if (dataUpdatedTransaction || dataUpdatedMonth || dataUpdatedYear) {
                await Swal.fire({ 
                    icon: 'success', 
                    title: 'Success', 
                    text: 'Data berhasil di update!' 
                }).then((result) => {
                    if(result.isConfirmed) {
                        router.push('/dashboard');
                        router.refresh();
                    }
                })
            } else {
                await Swal.fire({ icon: 'info', title: 'Info', text: 'Data anda sudah terbaru.' });
            }
        } catch (error) {
            console.error(error);
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Gagal update Data!' });
        } finally {
            setIsLoading(false);
        }
        
    };

    return (
        <>
            <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="gap-2">
                <History/>Update Data
            </Button>
        </>
    );
}
