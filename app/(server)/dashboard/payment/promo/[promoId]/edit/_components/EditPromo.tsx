'use client'

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaymentPromo } from '@prisma/client';
import moment from 'moment';

interface MovieProps {
    promoId: string;
    paymentPromo?: PaymentPromo;
}

function EditPromo({ promoId, paymentPromo }: MovieProps) {
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, reset, register, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            promoCode: paymentPromo?.promoCode,
            priceDisc: paymentPromo?.priceDisc,
            usable: paymentPromo?.usable ? moment(paymentPromo.usable).format('YYYY-MM-DDTHH:mm:ss') : '',
            expired: paymentPromo?.expired ? moment(paymentPromo.expired).format('YYYY-MM-DDTHH:mm:ss') : ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        data.priceDisc = parseInt(data.priceDisc);
        data.usable = moment(data.usable).format('YYYY-MM-DDTHH:mm:ssZ');
        data.expired = moment(data.expired).format('YYYY-MM-DDTHH:mm:ssZ');
        setIsLoading(true);
        try {
            const formattedData = {
                ...data,
            };

            console.log(formattedData)
            await axios.put(`/api/payment/promo/${promoId}`, formattedData);
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Edit Promo successfully!',
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/dashboard/payment/promo';
                }
            });
        } catch (error) {
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed edit promo!' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-[90vw] lg:w-[80vw] flex-col items-center">
                <Label className="flex justify-center text-[35px] pt-5 mb-10">Edit Data</Label>
                <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10">
                    <div className="flex flex-col justify-center items-center gap-3 h-fit min-w-[30vw]">
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Kode Promo:</Label>
                            <Input {...register('promoCode')} type="text" placeholder="kode..." />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Harga Diskon:</Label>
                            <Input {...register('priceDisc')} type="number" placeholder="diskon..." />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Bisa digunakan pada:</Label>
                            <Input value={watch('usable')} onChange={(e) => setValue('usable', e.target.value)} type="datetime-local" placeholder="pilih tanggal..." />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Expired pada:</Label>
                            <Input value={watch('expired')} onChange={(e) => setValue('expired', e.target.value)} type="datetime-local" placeholder="pilih tanggal..." />
                        </div>
                    </div>
                </div>
                <Button type="submit" variant={'secondary'} className="mt-10">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default EditPromo;
