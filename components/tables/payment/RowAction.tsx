"use client";

import React, { useState } from "react";
import { PaymentsRow } from "./columns";
import { Button } from "../../ui/button";
import { Pencil, TrashIcon } from "lucide-react";
import DeletePaymentDialog from "@/app/(server)/dashboard/payment/_components/DeletePaymentDialog";
import { useRouter } from "next/navigation";
import EditPayment from "@/app/(server)/dashboard/payment/[paymentId]/edit/_components/EditPayment";

export default function RowAction({
  payment,
}: {
  payment: PaymentsRow;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const route = useRouter()

  return (
    <>
      <div className="flex flex-row gap-2">
        <EditPayment
          payment={payment}
          trigger={
            <Button
              variant={"outline"}
              size={"icon"}
            >
              <Pencil className="h-4 w-4 shrink-0 text-green-500" />
            </Button>
          }
        />
        <DeletePaymentDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          paymentId={payment.id}
        />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowDeleteDialog(true)}
        >
          <TrashIcon className="h-4 w-4 shrink-0 text-rose-500" />
        </Button>
      </div>
    </>
  );
}
