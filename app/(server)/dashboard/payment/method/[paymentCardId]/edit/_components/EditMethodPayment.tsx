'use client'

import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import ImageUpload from '@/components/inputs/imageUpload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const EditMethodPayment = ({ method }: { method: any}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [nameCard, setNameCard] = useState<any>(method?.nameCard);
    const [numberCard, setNumberCard] = useState<any>(method?.numberCard);
    const [categoryInstitue, setCategoryInstitue] = useState<any>(method?.categoryInstitue);
    const [imageCard, setImageCard] = useState<any>(method?.imageCard);
    const [imageQR, setImageQR] = useState<any>(method?.imageQR);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            nameCard: method?.nameCard,
            numberCard: method?.numberCard,
            categoryInstitue: method?.categoryInstitue,
            imageCard: method?.imageCard,
            imageQR: method?.imageQR
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const formattedData = {
                ...data,
                nameCard: nameCard,
                numberCard: numberCard,
                categoryInstitue: categoryInstitue,
                imageCard: imageCard,
                imageQR: imageQR
            };
            await axios.put(`/api/payment/method/${method.id}`, formattedData);
            await Swal.fire({ icon: 'success', title: 'Success', text: 'Data edited successfully!' });
            router.push('/dashboard/payment/method');
            router.refresh();
            reset();
        } catch (error) {
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed add movie!' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeNameCard = (e: any) => {
        setNameCard(e.target.value);
    };

    const handleChangeNumberCard = (e: any) => {
        setNumberCard(e.target.value);
    };

    const handleChangeCategoryInstitue = (e: any) => {
        setCategoryInstitue(e.target.value);
    };

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-[90vw] lg:w-[80vw] flex-col items-center'>
                <Label className="flex justify-center text-[35px] pt-5 mb-10">Tambah Data</Label>
                <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10">
                    <div className="flex flex-col justify-center items-center gap-3 h-fit">
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Nama Kartu:</Label>
                            <Input {...register('nameCard')} type="text" onChange={handleChangeNameCard} value={nameCard} placeholder="input nama kartu" />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Nomor Kartu:</Label>
                            <Input {...register('numberCard')} type="text" onChange={handleChangeNumberCard} value={numberCard} placeholder="input nomor kartu" />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <Label>Masukkan Kategori Instansi:</Label>
                            <Input {...register('categoryInstitue')} type="text" onChange={handleChangeCategoryInstitue} value={categoryInstitue} placeholder="ewallet/bank" />
                        </div>
                    </div>
                    <div className='flex flex-row gap-10 items-center'>
                        <div className="flex flex-col w-fit gap-3 h-fit">
                            <Label>Pilih Poster:</Label>
                            <ImageUpload
                                value={imageCard}
                                onChange={(value) => {
                                    setImageCard(value);
                                    setCustomValue('imageCard', value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col w-fit gap-3 h-fit">
                            <Label>Pilih Backdrop:</Label>
                            <ImageUpload
                                value={imageQR}
                                onChange={(value) => {
                                    setImageQR(value);
                                    setCustomValue('imageQR', value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit" variant={'secondary'} className='mt-10'>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default EditMethodPayment;