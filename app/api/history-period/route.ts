import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const periods = await getHistoryPeriods(user.id);
  return Response.json(periods);
}

export type getHistoryPeriodsResponseType = Awaited<
  ReturnType<typeof getHistoryPeriods>
>;

async function getHistoryPeriods(userId: string) {
  const result = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      {
        year: "asc",
      },
    ],
  });

  const years = result.map((el) => el.year);
  if (years.length === 0) {
    return [new Date().getFullYear()];
  }

  return years;
}
