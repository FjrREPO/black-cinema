import GreetingsDashboard from "./_components/GreetingsDashboard";
import Overview from "./_components/Overview";
import History from "./_components/History";
import getCurrentUser from "../../_actions/get-user";
import { getAllPayment } from "@/app/_actions/get-all-payment";
import { getAllTransaction } from "@/app/_actions/get-all-transaction";
import { getAllMonthHistory } from "@/app/_actions/get-all-month-history";
import { getAllYearHistory } from "@/app/_actions/get-all-year-history";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  const payment = await getAllPayment()
  const transaction = await getAllTransaction()
  const monthHistory = await getAllMonthHistory()
  const yearHistory = await getAllYearHistory()

  if (!user) {
    redirect('/signin')
  }

  if (user?.role === 'user') {
    return <div>
      Forbidden page 403
    </div>
  }

  return (
    <div className="h-full bg-background">
      <GreetingsDashboard firstName={user.name || "Unknown"} payment={payment} transaction={transaction} monthHistory={monthHistory} yearHistory={yearHistory}/>
      <Overview transaction={transaction}/>
      <History />
    </div>
  );
}
