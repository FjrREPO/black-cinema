import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTablePaymentColumnHeader } from "./ColumnHeader";
import RowAction from "./RowAction";
import { getPaymentPromoType } from "@/app/api/payment/promo/route";

export type PaymentsRow = getPaymentPromoType[0];

export const columnsPaymentsPromo: ColumnDef<PaymentsRow>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "promoCode",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Promo Code"
      />
    ),
    cell: ({ row }) => <div>{row.original.promoCode}</div>,
  },
  {
    accessorKey: "priceDisc",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Price Discount"
      />
    ),
    cell: ({ row }) => <div>{row.original.priceDisc}</div>,
  },
  {
    accessorKey: "usable",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Usable"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.usable);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "expired",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Expired"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.expired);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowAction payment={row.original} />,
  },
];
