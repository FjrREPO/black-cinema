import { redirect } from "next/navigation";
import GreetingsDashboard from "./_components/GreetingsDashboard";
import Overview from "./_components/Overview";
import History from "./_components/History";
import getCurrentUser from "../../_actions/get-user";

export default async function Home() {
  const user = await getCurrentUser();

  if (user?.role !== 'admin') {
    return <div>
      Forbidden page 403
    </div>
  }

  return (
    <div className="h-full bg-background">
      <GreetingsDashboard firstName={user.name || "Unknown"} />
      <Overview />
      <History />
    </div>
  );
}
