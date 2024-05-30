import { useEffect, useState } from "react";
import { GetFormattedForCurrency } from "@/lib/helpers";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionItem from "./TransactionItem";

interface StatsCardsProps {
  from: Date;
  to: Date;
  transaction: any;
}

export default function CategoriesStats({ from, to, transaction }: StatsCardsProps) {
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredTran = transaction.filter((t: any) => {
      const transactionDate = new Date(t.date);
      return transactionDate >= from && transactionDate <= to;
    });
    setFilteredTransactions(filteredTran);
    setLoading(false)
  }, [transaction, from, to]);

  const incomeTransactions = filteredTransactions.filter((t: any) => t.type === 'income');
  const expenseTransactions = filteredTransactions.filter((t: any) => t.type === 'expense');

  const formatter = GetFormattedForCurrency("IDR");

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={loading}>
        <CategoriesCard
          formatter={formatter}
          type='income'
          filteredTransactions={incomeTransactions}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={loading}>
        <CategoriesCard
          formatter={formatter}
          type='expense'
          filteredTransactions={expenseTransactions}
        />
      </SkeletonWrapper>
    </div>
  );
}

function CategoriesCard({
  formatter,
  type,
  filteredTransactions
}: {
  formatter: Intl.NumberFormat;
  type: string;
  filteredTransactions: any[];
}) {
  const total = filteredTransactions.reduce((acc: number, curr: any) => acc + curr.amount, 0);

  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          Kategori {type === 'income' ? 'Pemasukkan' : 'Pengeluaran'}
        </CardTitle>
      </CardHeader>

      <div className="flex items-center justify-between gap-2">
        {filteredTransactions.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            Data tidak ditemukan untuk periode ini
            <p className="text-sm text-center text-muted-foreground">
              Coba pilih periode yang lain atau coba buat transaksi baru pemasukkan
            </p>
          </div>
        )}

        {filteredTransactions.length > 0 &&(
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredTransactions.map((item: any, index: number) => {
                const amount = item.amount || 0;
                const percentage = (amount * 100) / (total || amount);

                return (
                  <TransactionItem
                    key={index}
                    item={item}
                    formatter={formatter}
                    percentage={percentage}
                    transactionDescription={item.description}
                    type={type}
                    amount={amount}
                  />
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}
