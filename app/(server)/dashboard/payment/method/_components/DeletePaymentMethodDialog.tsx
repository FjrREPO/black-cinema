"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeletePaymentMethod } from "../_actions/deletePaymentMethod";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    paymentId: string;
}

export default function DeletePaymentMethodDialog({
    open,
    setOpen,
    paymentId,
}: Props) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeletePaymentMethod,
        onSuccess: async () => {
            toast.success("Kartu ini berhasil dihapus", {
                id: paymentId,
            });

            await queryClient.invalidateQueries({
                queryKey: ["method"],
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: paymentId,
            });
        },
    });

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah kamu yakin ingin menghapus data film ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Data yang sudah dihapus tidak bisa dikembalikan. Pastikan data yang
                        akan dihapus benar.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            toast.loading("Menghapus data film...", {
                                id: paymentId,
                            });

                            deleteMutation.mutate(paymentId);
                        }}
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
