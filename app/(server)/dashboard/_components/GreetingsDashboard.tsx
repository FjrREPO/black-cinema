'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import UpdateDataOverview from "./UpdateDataOverview";

interface Props {
  firstName: string;
  payment: any;
  transaction: any
  monthHistory: any
  yearHistory: any
}

export default function GreetingsDashboard({ firstName, payment, transaction, monthHistory, yearHistory }: Props) {
  const onSubmit = () => {

  }

  return (
    <div className="border-b">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
        <p className="text-3xl font-bold">Hello, {firstName}!👋🏼</p>

        <div className="flex items-center gap-3">
          <UpdateDataOverview type="income" payment={payment} transaction={transaction} monthHistory={monthHistory} yearHistory={yearHistory} />
        </div>
      </div>
    </div>
  );
}
