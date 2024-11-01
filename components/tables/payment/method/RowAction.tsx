"use client";

import React, { useState } from "react";
import { PaymentsRow } from "./columns";
import { Button } from "../../../ui/button";
import { Pencil, TrashIcon } from "lucide-react";
import DeletePaymentMethodDialog from "@/app/(server)/dashboard/payment/method/_components/DeletePaymentMethodDialog";
import { useRouter } from "next/navigation";

export default function RowAction({
  payment,
}: {
  payment: PaymentsRow;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const route = useRouter()

  return (
    <>
      <DeletePaymentMethodDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        paymentId={payment.id}
      />
      <div className="flex flex-row gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => route.push(`/dashboard/payment/method/${payment.id}/edit`)}
        >
          <Pencil className="h-4 w-4 shrink-0 text-green-500" />
        </Button>
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
