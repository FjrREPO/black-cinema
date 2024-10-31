'use client'

import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { Payment } from '@prisma/client';
import { format, formatISO, parseISO } from 'date-fns';

export default function EditPayment({ payment, trigger }: { payment: Payment, trigger: React.ReactNode; }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const [startTime, setStartTime] = useState<Date | null>(payment ? new Date(payment.startTime) : null);
  const [endTime, setEndTime] = useState<Date | null>(payment ? new Date(payment.endTime) : null);
  const [feeAdmin, setFeeAdmin] = useState(payment ? payment.feeAdmin : 0);
  const [methodPayment, setMethodPayment] = useState(payment ? payment.methodPayment : '');
  const [promoCode, setPromoCode] = useState(payment ? payment.promoCode : '');
  const [expiredPayment, setExpiredPayment] = useState<Date | null>(payment ? new Date(payment.expiredPayment) : null);
  const [totalPrice, setTotalPrice] = useState(payment ? payment.totalPrice : 0);
  const [price, setPrice] = useState(payment ? payment.price : 0);
  const [successPayment, setSuccessPayment] = useState<Date | null>(
    payment && payment.successPayment
      ? parseISO(formatISO(payment.successPayment))
      : null
  );
  const [status, setStatus] = useState(payment ? payment.status : '');
  const [room, setRoom] = useState(payment ? payment.room : 0);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {

    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (pending) return;

    setPending(true);

    try {
      const formattedData = {
        ...data,
        feeAdmin: parseInt(data.feeAdmin),
        totalPrice: parseInt(data.totalPrice),
        price: parseInt(data.price),
        room: parseInt(data.room),
        startTime: startTime ? formatISO(startTime) : '',
        endTime: endTime ? formatISO(endTime) : '',
        expiredPayment: expiredPayment ? formatISO(expiredPayment) : '',
        successPayment: successPayment ? formatISO(successPayment) : null,
      };
      await axios.put(`/api/payment/${payment.id}`, formattedData);
      toast.success('Payment updated successfully!');
      reset();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update payment.');
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full flex flex-row gap-5'>
            <div className='w-1/2'>
              <Label>Start Time</Label>
              <Input
                type="datetime-local"
                {...register('startTime')}
                value={startTime ? format(new Date(startTime), "yyyy-MM-dd HH:mm:ss") : ''}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setStartTime(selectedDate);
                }}
              />
            </div>
            <div className='w-1/2'>
              <Label>End Time</Label>
              <Input
                type="datetime-local"
                {...register('endTime')}
                value={endTime ? format(new Date(endTime), "yyyy-MM-dd HH:mm:ss") : ''}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setEndTime(selectedDate);
                }}
              />
            </div>
          </div>
          <div className='w-full flex flex-row gap-5'>
            <div className='w-1/2'>
              <Label>Fee Admin</Label>
              <Input
                type="number"
                {...register('feeAdmin')}
                value={feeAdmin}
                onChange={(e) => {
                  setFeeAdmin(parseInt(e.target.value));
                }}
              />
            </div>
            <div className='w-1/2'>
              <Label>Method Payment</Label>
              <Input
                type="text"
                {...register('methodPayment')}
                value={methodPayment}
                onChange={(e) => {
                  setMethodPayment(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='w-full flex flex-row gap-5'>
            <div className='w-1/2'>
              <Label>Promo Code</Label>
              <Input
                type="text"
                {...register('promoCode')}
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                }}
              />
            </div>
            <div className='w-1/2'>
              <Label>Expired Payment</Label>
              <Input
                type='datetime-local'
                {...register('expiredPayment')}
                value={expiredPayment ? format(new Date(expiredPayment), "yyyy-MM-dd HH:mm:ss") : ''}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setExpiredPayment(selectedDate);
                }}
              />
            </div>
          </div>
          <div className='w-full flex flex-row gap-5'>
            <div className='w-1/2'>
              <Label>Total Price</Label>
              <Input
                type="number"
                {...register('totalPrice')}
                value={totalPrice}
                onChange={(e) => {
                  setTotalPrice(parseInt(e.target.value));
                }}
              />
            </div>
            <div className='w-1/2'>
              <Label>Price</Label>
              <Input
                type="number"
                {...register('price')}
                value={price}
                onChange={(e) => {
                  setPrice(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <div className='w-full flex flex-row gap-5'>
            <div className='w-1/2'>
              <Label>Success Payment</Label>
              <Input
                type="datetime-local"
                {...register('successPayment')}
                value={successPayment ? format(new Date(successPayment), "yyyy-MM-dd HH:mm:ss") : ''}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setSuccessPayment(selectedDate);
                }}
              />
            </div>
            <div className='w-1/2'>
              <Label>Status</Label>
              <Input
                type="text"
                {...register('status')}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='w-full flex flex-row gap-5'>
            <div className='w-full'>
              <Label>Room</Label>
              <Input
                type="text"
                {...register('room')}
                value={room}
                onChange={(e) => {
                  setRoom(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit(onSubmit)} disabled={pending}>
            {pending && <Loader className="shrink-0 h-4 w-4 mr-2 animate-spin" />}
            {pending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
