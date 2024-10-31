"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTablePaymentColumnHeader } from "./ColumnHeader";
import RowAction from "./RowAction";
import { getPaymentMethodType } from "@/app/api/payment/method/route";
import Image from 'next/image'

export type PaymentsRow = getPaymentMethodType[0];

export const columnsPaymentsMethod: ColumnDef<PaymentsRow>[] = [
  {
    accessorKey: "nameCard",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Name Card"
      />
    ),
    cell: ({ row }) => <div>{row.original.nameCard}</div>,
  },
  {
    accessorKey: "numberCard",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Number Card"
      />
    ),
    cell: ({ row }) => <div>{row.original.numberCard}</div>,
  },
  {
    accessorKey: "categoryInstitue",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Category"
      />
    ),
    cell: ({ row }) => <div>{row.original.categoryInstitue}</div>,
  },
  {
    accessorKey: "imageCard",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Image Card"
      />
    ),
    cell: ({ row }) => (
      <div>
        <Image width={100} height={100} src={row.original.imageCard} alt="Image Card" style={{ width: "50px", height: "auto" }} />
      </div>
    ),
  },
  {
    accessorKey: "imageQR",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="QR Code"
      />
    ),
    cell: ({ row }) => (
      row.original.imageQR ? (
        <div>
          <Image width={100} height={100} src={row.original.imageQR} alt="QR Code" style={{ width: "50px", height: "auto" }} />
        </div>
      ) : (
        <div>No QR Code</div>
      )
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowAction payment={row.original} />,
  },
];
