"use client";

import React, { useState } from "react";
import { PaymentsRow } from "./columns";
import { Button } from "../../../ui/button";
import { TrashIcon } from "lucide-react";
import DeletePaymentMethodDialog from "@/app/(server)/dashboard/payment/method/_components/DeletePaymentMethodDialog";

export default function RowAction({
  payment,
}: {
  payment: PaymentsRow;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeletePaymentMethodDialog
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
    </>
  );
}
